# Conference Package Manager
### Problem:
Need an all-in-one resource for event information and communication.

### Abstract:
An administration tool for event organizers to relay information about their events to registrants.

A tool for registrants to view event information, and communicate with fellow participants, including scheduling meetups and viewing people'ss locations during the event.

### User Stories:
* As an event, I want an easy, dynamic way for me to connect with my attendees so that I can give them information as the event is going on so that I don't have to rely on emailing everybody.
* As an event attendee, I want a single app that provides all the planning tools I need for all the conferences I attend, so that I am not juggling paper brochures, messaging clients, and calenders when on foot in a crowded center.
### Requirements/Features:
* Front End
    * Android App with a search tool to download "conference packages" from database.
    * Show the "package" in a nice UI/UX, Organization system, use google account sign in feature to save packages for multiple devices.
    * Account creation:
        * Can register as attendee or event host.
        * Login with facebook/google button?
* Back End
    * NodeJS + MongoDB
    * MongoDB to hold each "package" as a document object.
    * NodeJS will handle get/post requests and return those "packages".
        * Each user as an object as well if we stretch to user registration.

### Stretch Goals:
* Front End:
    * Event Recommendations based on: Location, theme, and repeated speakers/organizers/similar users
    * Displays attendees interested in certain event activities.
    * Search function for finding activities
        * Within an event
        * Across events
    * Allows attendees to message each other.
    * Allows attendees to contact event hosts.        
* Back End:
    * A report class which formats statistics that are representative of how profitable the app is.
        * X accounts created in the past Y months.
        * X events hosted in past Y months.
### Solution Architecture:
* Front End app with search bar. User A searched for Conference A, gets the information downloaded on the app. Can use the information to guide him throughout the conference. When he searches, the search term is sent as a get request to the NodeJS backend which will query the mongo database, find the relevant package, or return a list of most likely packages that search term matches. These are parsed and sent back to the app as post data. The app renders the JSON object as pictures/data in a nice UI/UX format.
* On startup, the app will always send a get-request to the server and md5's of the packages and packagesIDs to make sure they are all up to date. Fetch new ones if more information was posted.
* If we allow for dynamic queries, the user can touch parts of the map and such, and the app will query the offline stored package. Things like notes/bookmarks are saved offline.



