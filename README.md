I have built one project with React, where users can browse open roles, view job details and apply eith a application form.
The application demonstrates routing, state management, form validation as well as local storage.
Implementation Notes:
This project implements a three-pages careers portal: A Careers page to explore open roles, a job Detail to 
learn about a role and application page to apply. Applications are stored locally and success state confirms submission.

key Features :
1. State: used in Careers.jsx to manage search,filters and job listings.
   It is used in ApplicationForm.jsx to manage form field values and errors.
2. Props: It is used to pass job data( title, location, etc. ) into JobCard components.
   Also used to passed success/ cancel callbacks into ApplicationForm.
3. Validation: It will check the client sie for required fields(name,email,phone,cover letter).
    To display the inline error messages without clearing user input.
4. Debounce: Implemented in the Careers search bar to delay filtering as the user types.
5. Storage: Application saved to and read from local storage.
   It will also ensures persistence between page reloads.
6. Routing:
   /careers --> Job listings with search + filters.
   /careers/:jobId --> Job detail page with role info and application option.
   /careers/:jobId/apply --> Dedicated application form page.
