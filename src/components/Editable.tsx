import React, { useState } from 'react';

function Editable({ text, type, placeholder, children, ...props }) {
  const [isEditing, setIsEditing] = useState(false);

  // Event handler while pressing any key while editing
  function handleKeyDown(event, type) {
    // Handle when key is pressed
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <span>{text || placeholder || 'Editable content'}</span>
        </div>
      )}
    </section>
  );
}

/*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/

export default Editable;
