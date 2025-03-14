// pages/auth/signup.js

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";

// export default function SignUp() {
  
//   // const {data: session, status} = useSession();
//   const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});
//   const [error, setError] = useState('');
  
//   const router = useRouter();

//   // authenticate
//   // useEffect(() => {
//   //   if (status == 'authenticated') {
//   //     router.push('/');
//   //   }
//   // },[status, router])

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]: e.target.value});
//   }

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     const res = await fetch(`/api/auth/signup`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (data.error) {
//       setError('Error happened here')
//       setTimeout(() =>{
//         setError('')
//       }, 3000); // remove error after 3 sec
//     } else {
//       router.push('/auth/signin');
//     }
//   }

//   return (
//     <>
//     <div className="flex flex-center full-h">
//       <div className="loginform">
//           <div className="heading">Sign Up Create Admin</div>
//           <form className="form" onSubmit={handleSubmit}>
//             <input type="email" name="email" onChange={handleChange} className="input" placeholder="Email"/>
//             <input type="password" name="password" onChange={handleChange} className="input" placeholder="Password"/>
//             <input type="password" name="confirmPassword" onChange={handleChange} className="input" placeholder="Confirm Password"/>
//             <button className="login-button" type="submit">Sign Up</button>
//             {error && <p>{error}</p>}
//           </form>
//       </div>
//     </div>
//     </>
//   );
// }

export default function singup(){
  return <>

    <h1>You Don't Have permision to Signup To this Admin Dashboard</h1>
  
  </>
}