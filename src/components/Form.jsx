import { useState } from "react";
import './Form.css'
import Delete from '../images/delete.svg'
import "@fontsource/permanent-marker";

const Form = () => {

    const [checkboxes, setCheckboxes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
  
    const handleCheck = (id) => {
      setCheckboxes(
        checkboxes.map((checkbox) =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleAddCheckbox = () => {
      setShowInput(true);
      setIsEdit(false);
    };
  
    const handleEditCheck = (id) => {
      setIsEdit(true);
      setEditId(id);
    };
  
    const handleCancelEdit = () => {
      setIsEdit(false);
      setEditId(null);
    };
  
    const handleFormSubmit = (e) => {
      if(inputValue === '' || inputValue === ' '){
        e.preventDefault()
      }else{
        e.preventDefault();
      const newId = checkboxes.length + 1;
      const newCheckbox = { id: newId, text: toUpper(inputValue), checked: false };
      setCheckboxes([...checkboxes, newCheckbox]);
      setInputValue('');
      setShowInput(false);
      setIsEdit(false);
      }
      
    };

  function toUpper(str){
    const arr = str.toString().split(' ');
    const result = arr[0].slice(0,1).toUpperCase() + arr[0].slice(1) +  ' ' + arr.slice(1);
    
 
    return result ;
  }

  const handleEditSubmit = (e,id) => {
      e.preventDefault();
      setCheckboxes(
        checkboxes.map((checkbox) =>
          checkbox.id === id && inputValue !== '' ? { ...checkbox, text: inputValue } : checkbox
        )
      );
      
      setInputValue('');
      setIsEdit(false);
      setEditId(null);
      
    };

   function deleteCheckbox(id) {
      const copy = Object.assign([], checkboxes);
      const result = copy.filter(elem => elem.id !== id);
      setCheckboxes(result)
    }
   function blurInput(event){
    if(inputValue === '' && event.relatedTarget === null){
      setShowInput(false)
    }
   }
  
    return (
      <ol className="content">
        {showInput ? (
          <form onSubmit={handleFormSubmit}>
            <div className="sub__form">
              <input className="add__input" type='text' value={inputValue}  placeholder = 'Enter the text' onChange={handleInputChange} onBlur ={blurInput}/>
              <button className="add__btn" type='submit'>Add</button>
            </div>
          </form>
        ) : (
          <button className="btn" onClick={handleAddCheckbox}>
            <span>Add your task</span>
            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
            </svg>
          </button>
        )}
        {checkboxes.map((checkbox) => (
          
          <li className="aboba" key={checkbox.id}>
            {isEdit && editId === checkbox.id ? (
                <>
                    <input className="edit__input"
                  type='text'
                  defaultValue={checkbox.text}
                  onChange={handleInputChange}
                />
                
                <button className="edit__save__btn" type="button" onClick={(event) => handleEditSubmit(event, checkbox.id)}>Save</button>
                <button className="edit__cancel__btn" type='button' onClick={handleCancelEdit}>
                  Cancel
                </button>
                <span className="edit__delete"><img className ='edit__delete-img' src={Delete} onClick={() => deleteCheckbox(checkbox.id)} alt="" /></span>
                
                </> 
              
            
              
            ) : (
              <>
                <label className="checkbox style-c">
                <input 
                  type='checkbox'
                  checked={checkbox.checked}
                  onChange={() => handleCheck(checkbox.id)}
                />
                 <div className="checkbox__checkmark"></div>
                <span className="checkbox__body"
                  onClick={() => handleEditCheck(checkbox.id)}
                  style={{ textDecoration: checkbox.checked ? 'line-through' : 'none' }}
                >
                  {checkbox.text}
                  </span>
                
                </label>
                <span className="delete"><img className ='delete' src={Delete} onClick={() => deleteCheckbox(checkbox.id)} alt="" /></span>
              </>
            )}
          </li>
        ))}
        
      </ol>
    );
  }

export default Form;

