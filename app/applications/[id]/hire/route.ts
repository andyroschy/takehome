import prisma from "@/lib/db";

const errorCodes = {
  notFound: "application-not-found",
  invalidStatus: "invalid-status",
  shiftNotOpen: "shift-not-open",
} as const;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: applicationId } = await params;

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
    },
    include: {
      shift: true,
    },
  });

  if (!application) {
    return Response.json(
      {
        code: errorCodes.notFound,
        message: "could not find application with the given id",
      },
      { status: 404 }
    );
  }

  if (application.status !== "APPLIED") {
    return Response.json(
      {
        code: errorCodes.invalidStatus,
        message: "application was not in APPLIED status",
      },
      { status: 400 }
    );
  }

  if (application.shift.status !== "OPEN") {
    return Response.json(
      {
        code: errorCodes.shiftNotOpen,
        message: "shift was not open, and could not be hired",
      },
      { status: 400 }
    );
  }

  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const shift = await tx.shift.updateMany({
        data: {
          status: "HIRED",
        },
        where: {
          id: application?.shift.id,
          status: "OPEN",
        },
      });

      if (shift.count === 0) {
        return {
          ok: false,
          code: errorCodes.shiftNotOpen,
          message: "shift was not open, and could not be hired",
          status: 400,
        };
      }

      const t = await tx.application.updateMany({
        data: {
          status: "HIRED",
        },
        where: {
          id: applicationId,
          status: "APPLIED",
        },
      });

      if (t.count === 0) {
        return {
          ok: false,
          code: errorCodes.invalidStatus,
          message: "application was not in APPLIED status",
          status: 400,
        };
      }

      return { ok: true };
    },
    {
      isolationLevel: "Serializable",
    }
  );

  if (!transactionResult.ok) {
    return Response.json(
      {
        code: transactionResult.code,
        message: transactionResult.message,
      },
      { status: 400 }
    );
  }

  return Response.json({ status: "success" }, { status: 200 });
}
