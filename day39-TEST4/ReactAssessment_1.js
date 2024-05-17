//Assessment #4 react and its fundamentals - 16/05/2024

//===1. create a webpack setup, index html and one css file to show css in next questions
//1.npm init
//2.npm i webpack webpack-cli webpack-dev-server -D
//3.npm i @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin babel-loader css-loader style-loader
//4.Create a Babel configuration file named `.babelrc` in the root of project. 
//5.Create webpack.config.js file
//6.Create src\index.js file
//7.Create src\index.html file
//8.Create src\app\test.css
//9.Add run commands to scripts section in package.json
    //"start": "webpack serve --mode development ",
    //"build": "webpack --mode production ",
//10.npm run build
//11.npm start

//===2. how react renders dom in conservative manner - explain (can skip this question)

//===3. create a class component named - Success and show some quotes (messages) on success in it
//1.npm i react react-dom
//2.Create src\app\Success.js
//3.Create src\app\ApplicationComponent.js
//4.Edit src\index.html to include <div id="root"></div>
//5.Edit src\index.js to include ReactDOM.createRoot(document.getElementById("root")) and root.render(<ApplicationComponent/>)

//===4. create a functional component SuccessChild, make it child of Success and pass Name and Address to it from Success
//1.Create src\app\SuccessChildComponent.js
//2.Edit src\app\SuccessComponent.js to call <SuccessChildComponent Name = {"PARENT"} Address = {"SOMEWHERE"} />

//===5. create SuccessStory as another component, pass this as props in SuccessChild from Success component
//1.Create src\app\SuccessStoryComponent.js
//2.Edit src\app\SuccessChildComponent.js to include {props.StoryComponent}
//3.Edit src\app\SuccessComponent.js to call <SuccessChildComponent Name = {"PARENT"} Address = {"SOMEWHERE"} StoryComponent = {<SuccessStoryComponent/>} />

//===6. create UserSignIn component using uncontrolled way, should be class component
//1.Create src\app\UserSignInComponent.js
//2.Edit src\app\ApplicationComponent.js to call <UserSignInComponent/>

//===7. explain how virtual dom works (can skip this question)

//===8. pass a random value from SuccessStory component back to Success
//1.Edit src\app\SuccessComponent.js to add the constructor(), a property: updateId = (value) => {}, and updateIdInParent = {this.updateId}
//2.Edit src\app\SuccessStoryComponent.js to call {props.updateIdInParent("abc")}

//===9. Create a class component and show all the life cycle hooks/methods
//1.Create src\app\AllLifeCycleMethodsComponent.js

//10. Make a state change, the state should be duplicate and then stop it to call render method to improve efficiency.
//1.Edit src\app\AllLifeCycleMethodsComponent.js
//2.Edit src\app\ApplicationComponent.js to call <AllLifeCycleMethodsComponent/>
