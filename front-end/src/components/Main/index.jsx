import styles from "./styles.module.css";
import React,{useEffect,useState} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		
	};
	const [firstName, setFirstName] = useState("");
	const [lastName,setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	useEffect(() => {
		const getProfile = async () => {
			try {
				const url = `http://localhost:8080/api/users/${param.id}`;
				const user = (await axios.get(url)).data;
				 setFirstName(user.firstName);
				 setLastName(user.lastName);
				 setEmail(user.email);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		};
		getProfile();
	}, [param]);


	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Mern Dev</h1>
				<Link to="/login">
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</Link>
			</nav>
			<section className={styles.card}>
				<div><h1 className={styles.title}> First Name: {firstName}</h1></div>
				<div><h1 className={styles.title}> Last Name: {lastName}</h1></div>
				<div><h1 className={styles.title}> Email: {email} </h1></div>
			</section>
			{error && <div className={styles.error_msg}>{error}</div>}
		</div>
	);
};

export default Main;
