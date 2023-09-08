import React,{useState, createContext, useContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//Context
// #1 createContext [Provider, Consumer] => contextの名前
const ThemeContext = createContext();

// #A1 สร้าง HOC : Higher Order Component (Provider)
// HOC คือ FC ที่รับ Component เข้าไปและ return Component ใหม่ออกมา
// function ThemeContextProvider (props) {
//   console.log(props)
//   return <ThemeContext.Provider>{props.children}</ThemeContext.Provider>
// }
/* #A2 Share Data& Logic ผ่าน arttribute value
==> Data (state,boolean,string,object,array etc.) 
==> Logic (Fn ที่ใช้ handle ต่างๆ)
*/
// Data : isDarkMode,stylesOBj
// Logic : setIsDarkMode,handleToggleTheme
function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesObj = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const sharedObj = { theme: stylesObj, toggleTheme: handleToggleTheme };
  return <ThemeContext.Provider value={sharedObj}>{props.children}</ThemeContext.Provider>;
}
/* #A3  นำ Provider ไปครอบ Children [Provider]
<ThemeContextProvider>
<App/>
</ThemeContextProvider>
*/

// ##################################################
// ##################################################
// ##################################################
// ##################################################

/*
###### B1 : @Children Component ดึงค่า Shared object ผ่านตัว useContext
SYNTAX: useContext(ContextName)

eg. const shareObj = useContext(ThemeContext)

*/


//UI :  Component
function App() {
  const s = useContext(ThemeContext);
  console.log(s);

  return (
    <div className='App' style={s.theme}>
      <h1>Theme App</h1>
      <button onClick={s.toggleTheme}>Toggle Theme</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);

