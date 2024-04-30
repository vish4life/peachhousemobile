# Peach House Mobile
Peach house is a personal mobile application project for improving react native skills.

## Tech Stack
* React native
* Expo

## Project Requirement
Building the mobile application for a renowned restaurant* "`Peach House`"

### The Mobile application should contain the following
* Welcome Screen:
    > * Uses animation to load the screen
    > * Head Section | Main Section | Footer Section 
* Head Section:
    > * The Peach logo, Name of the restuarant
* Main Section:
    > * Signature info (Hero text)
    > * Sign Up | Login buttons
* Footer Section:
    > * Copyrights information

## UX / UI Design
* Colors
    * Background
        > * coral
        > * light peach
        > * Salmon
    * Buttons
        > * Display Buttons:
        > > * coral
        > > * white Text
        > * Processing Buttons:
        > > * White Background
        >  > * Salmon text with coral border
    * Links
        > * Gray color
    * Text
        > * White or Black
        > * coral 
> `Note: Font for iOS will be Futura but for Android it shall be default`

## Functional Design
* Welcome Screen:
    > * Welcome screen displays some text about restaurant and provides option to either signup or login
* Sign Up:
    > * Signup screen takes three inputs first name, email and password (with validations mentioned in placholders)
    > * Button to signup
    > * Back arrow to return to Welcome screen
* Login:
    > * Login screen takes email, password as input (with validations mentioend in the placeholders)
    > * If email and password match then login navigates to home screen else displays following alerts
        > * Email not found
        > * Password mismatch
    > * Also provides a link to reset password
        > * Reset screen takes email as input (with validations mentioned in the placeholder)
        > * Submit button
        > * On submit returns an alert
    > * Back arrow to return to welcome screen
* Home Screen:
    > * Displays hero section with text and image
        > * top three signature dishes of the week
    > * Scrollable images (horizontal scroll)
* Menu Screen:
    > * Displays list of menu items along with image and details
    > * Provides filter options based on the menu categories
    > * Also provides a searchbar to enter the dish or category
* Profile Screen:
    > * Displays image and if no image then displays two letters from the name
        > * if both first and last name are available then first letter of first name and first letter of second name else first two letters of first name
    > * Change | Remove buttons to update the image
    > * Personal information
    > > * First Name
    > > * Last Name
    > > * Email
    > > * Phone (Code + Number)
    > > * Password
    > * Email Notifications section (selectable)
    > > * Password updates
    > > * Order updates
    > > * Sepcial offers
    > > * PH News
    > * Save button to save the data
    > `Note: If first time after singup then data entered during signup is autopopulated`
* Logout Screen:
    > * Logout screen is a actionable screen which displays alert to logout
    > * On selecting yes returns to Welcome screen
    > * On selecting no returns to Home screen
> Note: Head section is common in all the above screens and no footer section

# Technical Design
### Libraries & Styling
> React Native
> > Native libraries
> > * async-storage
> > * navigation (tabs & stack)
> > * native
> > * native-elements
> > * native-paper
> > Expo
> > * expo
> > * expo-image-picker
> > * expo-sqlite
> > * expo-searchbar
> > Lodash
> > * debounce

> Stylesheet
> > * font imports from google
> > * flex layout

## Code Flow:
### Processing Logic:
* Welcome Screen:
    > * React native module `Animated` is used for loading the animation on launch
    > * `Imagebackground` for setting the background image
    > * `ScrollView` for displaying the information (`View` + `Text`) and buttons for signup and login using `TouchableOpacity`
* `Stack Navigation` is used in the navigation.js file to navigate between Welcome / Signup and Login screens
    > * Once the login or Signup is successful then `Tab Navigation` is used for Home / Menu / Profile / Logout screens
* `Async-Storage` is used for storing the initially information during signup
* Home Screen:
    > * Simple `ScrollView` with `Images` using horizontal scroll
* Menu Screen:
    > * `Flatlist` to display menu items
    > * `fetch api` to fetch the menu from url if data is not available in `sqlite`. All this with `useEffect` userhook
        > Note: `Expo Sqlite` database is used to store menu information
    > * `lodash.debounce` is used to delay the fetching of menu or category using searchbar
    > * touchable buttons are used as filters which is an array of categories
* Profile Screen:
    > * `expo-image-picker` is used to save the image and is stored in `async-storage`
* Logout Screen:
    > * `create context api` is used to conditionally render the welcome screen or navigate to tab navigation
    > * on logout the context api disables the tab navigation and brings forward the stack navigation of welcome screen

### Wireframe
* Wireframe is created using `Figma`
    > * url: `https://www.figma.com/proto/g8mBIuT9U3SRSB2bUqEoLt/Figma-basics?type=design&node-id=610-5&t=MsxUnQND4zUHMuJv-0&scaling=scale-down&page-id=610%3A3`
    > * Sample snaps:
    <img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/00_wireframe_figma.JPG" width='300' height='600' />

## Application Snippets
<table>
    <tr>
        <td><h2>Welcome Screen</h2></td>
        <td><h2>Sign Up Screen</h2></td>
        <td><h2>Login Screen</h2></td>
    </tr>
    <tr>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/03_welcome.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/18_signup.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/04_login.png" width='300' height='600' /></td>
    </tr>
</table>
<table>
    <tr>
        <td><h2>Home Screen</h2></td>
        <td><h2>Menu Screen</h2></td>
        <td><h2>Menu Screen</h2><br>Search: No results</td>
    </tr>
    <tr>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/06_home_2.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/07_menu.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/07_menu_search_no_results.png" width='300' height='600' /></td>
    </tr>
</table>
<table>
    <tr>
        <td><h2>Menu Screen</h2><br>Search: With results</td>
        <td><h2>Menu Screen</h2><br>Filters Selection</td>
        <td><h2>Profile Screen</h2></td>        
    </tr>
    <tr>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/09_menu_search2.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/10_menu_filters.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/11_profile.png" width='300' height='600' /></td>
    </tr>
</table>
<table>
    <tr>
        <td><h2>Profile Screen</h2><br>Preferences Section</td>
        <td><h2>Profile Screen</h2><br>Image Selection</td>
        <td><h2>Profile Screen</h2><br>Image Updated</td>
    </tr>
    <tr>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/12_profile_preferences.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/13_image_selection.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/14_image_selected.png" width='300' height='600' /></td>
    </tr>
</table>
<table>
    <tr>
        <td><h2>Profile Screen</h2><br>Image Remove</td>
        <td><h2>Profile Screen</h2><br>Image Removed</td>
        <td><h2>Logout Screen</h2><br>Logout Message</td>
    </tr>
    <tr>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/15_image_remover.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/16_image_removed.png" width='300' height='600' /></td>
        <td><img src = "https://github.com/vish4life/peachhousemobile/blob/main/assets/snapshots/17_logout.png" width='300' height='600' /></td>
    </tr>
</table>