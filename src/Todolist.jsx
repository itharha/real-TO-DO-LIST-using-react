import React,{useState  , useEffect } from "react";
function Todolist(){
const [lists, setList] = useState(() => {
  const saved = localStorage.getItem("todolist");
  return saved ? JSON.parse(saved) : [];
});

const[newlist,setNewlist]=useState("");
const [ editIndex, setEdit]=useState(null);
const[filter,setFilter]=useState("all");
const[theme,setTheme]=useState("light")



function handleChange(event){
    setNewlist(event.target.value);
}
function handleKeyDown(event){
    if(event.key === "Enter"){
        editIndex !== null?Update() :Add();
    }
}
function Add(){
    if(newlist.trim() !== ""){
            const newtask={text:newlist,completed:false ,date:new Date().toLocaleString() }
     setList(l =>[...l,newtask]);
      setNewlist("");
    }
  
}
function Mark(index){
    const Edited=[...lists];
    Edited[index].completed=!Edited[index].completed;
    setList(Edited);


}
function Delete(index){
    setList(lists.filter((_,i) => i !== index));
    //update also here for fucntion update
    if(editIndex==index){
        setNewlist("");
        setEdit(null);
    }
}
function MoveUp(index){
    if(index>0){
const Update=[...lists];
 const temp=Update[index-1];
  Update[index-1]=Update[index];
    Update[index]=temp;
    setList(Update);
    }


}
function MoveDown(index){
    if(index<lists.length-1){
        const Update=[...lists];
        const temp=Update[index+1];
  Update[index+1]=Update[index];
    Update[index]=temp;
    setList(Update);
    }

}

function Startupdate(index){
    setNewlist(lists[index].text); // up our list to input
    //.text ymdlha text te list lhbina updatyh bch ndirou true or false..
    setEdit(index);  //stockage

}
function Update(){
    if(newlist.trim() !== ""){
        const UpdateList=[...lists];//copy of our list
     
UpdateList[editIndex].text=newlist;
setList(UpdateList);//make update list in our list
setNewlist("")//we use it cuz she is related with input"empty input"
setEdit(null);//to update 

    }
}

// localstroh yhwel array t3na lstring (json.stringify)co ystockiha
useEffect(()=>{
localStorage.setItem("todolist",JSON.stringify(lists))
},[lists])

function Filter(){
    if(filter==="all"){
        return lists;
    }
    if (filter==="active"){
        return lists.filter(l=>l.completed===false)
    }
     if (filter==="completed"){
        return lists.filter(l=> l.completed===true)
    }
}
function Toggle(){
    setTheme(l=>(l==="light"?"dark":"light"));
}
//pour toggle tmshii ausi 3la body.
useEffect(()=>{
 document.body.className="";
document.body.classList.add(theme);

},[theme])
return(
    <>
     <div className="toggle-container">
             <button className="toggle-btn" onClick={Toggle}>
                  {theme==="light"?"🌑 " : "🌤️ "}
            </button> 
        </div>
   
          <h1 className="title">Productivity Hub 🤍 </h1>

    <div className={`container ${theme}`}>

 

        <div className="input-list">
           <input value={newlist} onKeyDown={handleKeyDown} onChange={handleChange} type="text" placeholder="enter your tasks"/>
         <button className="action-button" onClick={editIndex !==null? Update:Add}>
            {editIndex !==null?" 💾 Update":" ➕ Add"}
        </button>
        </div>

        <div className="filter-button">
<button className={filter==="all"?"selected":""} onClick={()=>setFilter("all")}>📝</button>
  <button className={filter==="active"?"active":""} onClick={() => setFilter("active")}>⏳ </button>
  <button className={filter==="completed"?"done":""} onClick={() => setFilter("completed")}>✔️ </button>
        </div>

      

    <ul>
            {Filter().map((list,index) => (<li key={index}>
                <input className="mark-button" type="checkbox" checked={list.completed} onChange={()=> Mark(index)}/>
                <span className={`text ${list.completed? "completed":""}`}>{list.text}</span>
   <div className="date-update">
        <span className="date">{list.date}</span>
    </div> 
        
                             
    <button className="delete-button" onClick={()=>Delete(index)} >🗑️</button>     
    <button className="move-button" onClick={()=>MoveUp(index)} >🔼</button>    
    <button className="move-button" onClick={()=>MoveDown(index)} >🔽</button>
    <button onClick={()=>Startupdate(index)} className="update-button">✏️</button>   
    
                                 
                                       </li>
                                    ))} 
                                
                  
    </ul>
   
</div>
    </>
 
);
};
export default Todolist;