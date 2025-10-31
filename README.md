## Getting Started

Install dependencies:

```
npm install 
```
### Database

For simplicity's sake, this project is configured to use a SQL-Lite database. 
A db file with sample data is already included in the repository.

Copy `sample.db` from the root folder into `prisma/dev.db` 

The sample databse comes with three users, and some shifts.

I've used the DB schema proivded on the challenge description.

On a real application a real DB like postgres should used. I used SQL-Lite simply because it doesn't require running a containerized DB or installing a DB enngine on the host machine.

I chose using a sample DB since seemed easier than providing an initialization script or a seed migration.

### Run application

To Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Calling the hire endpoint

Making a POST request to `applications/{applicationId}/hire` sets the shift associated with the application, and the application itself to HIRED.

No need to pass the shift id since an application is already associated with a single shift.

## Architecture

The architecutre is based on the sample next application provided on Prisma's webiste. It's a single monolith with both the appy, the front end code and the SSR server.

Next's app router convention is already oppinionated on the folder structure of the application. Following that pattern, I like placing sub-components on the folder hieararchy closest to where they are used.

For example, sub-components that are only concerned with shifts, are placed inside the `/shifts` folder and so on. Additional sub-folders can be created to group related artifacts. 

### Scalability concerns

This architecture is simple and can help to get things out of the ground quickly. For this kind of demo it works well enough. But I have my resevations on how such an architecture would scale on a real world application.

Coupling the backend API with a FrontEnd framework sounds like it could causes serious head-aches down the line.

For example, we cannot easily switch the front-end framework in the future if the need arised.

The endpoints that are not associated with UI code (those defined in  `routes.tsx` files) need to be implemented within the limitations of NextJS framework, which is clearly not designed for an stand alone API.

The API servers cannot be scaled independently, there doesn-t seem to be any support for running backg-ground or async tasks, and so on.

Calling the DB directly from the NextJS application is also convenient, but it alos sounds like the kind of thing that can be problematic down the line. There's no clear separation of concern between the application logic, and the presentation logic, DB models may leak to the presentation layer. There are probably other issues that I cannot think of right now.

## Implementaiton Notes 

The UX/UI for the shift search is admittedly pretty bad. It's mostly a quick and dirty way to demonstrate the implementation queryString based search and filtering. Using query parameters for this has the advantage of being able to generate sharable links for queries,  and persisting the query through page refreshes.

Result and Maybe types are used to communicate errors. This approach makes it more explicit what method invokations can be expeted to fail, and which cannot. The result type also  ensures that the errors are checked, since you cannot access the value property without checking that `ok === true`. 

The hire endpoint is implemented with a DB transaction to avoid potential race conditions with simultaneous request.

There are more notes provided on the relevant source code with code comments.

The shifts page displays every shift by default since there was no explicit requirement, but I'd assume if this was a real world application shift that already passed, or are otherwise unavaialbe shouldn't be displayed.

I would typically use component libraries for inputs, calendars and such, since those tend to provide, good styling and UX out of the box.

 I chose not to use any external dependencies other than those mentioned in the challenged to keep it simple. But I wouldn't recommend this on a productive environment.


