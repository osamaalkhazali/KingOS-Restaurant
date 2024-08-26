import React from 'react'
import './title.css'

const Title = (props) => {
  return (
    <div className="custom-title">
      <img 
                  src="https://th.bing.com/th/id/R.4d58c16caa2b65d8921c9581a82e5a9a?rik=pA%2bkhl6MPS9Ekg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2faiq%2fLdb%2faiqLdbbqT.png&ehk=eFa9eWtbKwqbjCqwMSj0In1QzHpf1hAsCwIg3FCKuD4%3d&risl=&pid=ImgRaw&r=0" 
                  alt="Logo"
      />
      <h1>{props.children}</h1>
    </div>
  )
}

export default Title