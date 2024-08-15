import React from 'react'
import Swal from 'sweetalert2'



const DeletePopup = ({handleDelete, itemId , text}) => {

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(itemId)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }  
  
  return (
    <div 
    onClick={handleClick}>
      {text}
    </div>
  )
}

export default DeletePopup