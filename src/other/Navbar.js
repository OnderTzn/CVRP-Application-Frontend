import React from 'react';

const Navbar = ({ onAdd, onEdit, onDelete }) => {
  return (
    <div className="navbar">
      <button className="navbar-button" onClick={onAdd}>
        Add Address
      </button>
      <button className="navbar-button" onClick={onEdit}>
        Edit Address
      </button>
      <button className="navbar-button" onClick={onDelete}>
        Delete Address
      </button>
    </div>
  );
};

export default Navbar;