import {useState, useEffect, useRef, useContext} from 'react'
import React from 'react'
import {Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import {ErrorPage} from "./components/ErrorPage.jsx";
import {AppContext} from "./components/AppContextProvider.jsx";
import {Example} from "./components/Example.jsx";
import '@fontsource/inter';

function App(props) {


    const context = useContext(AppContext)
    return (
        <div className={`${context.colorMode} App`}>
            {/* <div className={'nav-bg'} > */}
            {/*     <Link to={"/"}>Home</Link> */}
            {/*     /!* <Link to={"/About"}>About</Link> *!/ */}
            {/*     /!* <Link to="/example">Example</Link> *!/ */}
            {/* </div> */}

            <Routes>
                <Route path={"/"} element={<Example/>}/>
                {/* <Route path={"/About"} element={<About/>}/> */}
                {/* <Route path="/example" element={<Example/>}/> */}
                {/* catch all, so any unknown pages navigate back to the home page, or
             error page to show it doesn't exist, then auto redirect home  */}
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </div>
    )
}

export default App



/*


## gh-pages when finished

1)  Go into package.json -> in the scripts section add the code

```
"deploy": "gh-pages -d dist"
```


2) go to vite.config.js -> after plugins, write base with the current directory on Github

```
base: "/github project directory"
 ```
3) Install gh-pages that lets us easily deploy to gh-pages branch

```
npm install gh-pages --save-dev
```

11) When we are ready to upload to GitHub pages do this

    ```
    npm run build
     ```

    ```
    npm run preview
     ```

    ```
    npm run deploy
    ```
If it ask for username, give GitHub username, and by "password" it means GitHub access token. If we get the error "github pages already exist"
. Go into node_modules folder -> .cache folder -> delete "gh-pages" -> redeploy
*/
