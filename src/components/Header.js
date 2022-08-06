import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {

	return (
		<>
			<div style={{
				display: "flex",
				background: 'black',
				padding: '5px 0 5px 5px',
				fontSize: '20px'
			}}>
				<div style={{ margin: '10px' }}>
					<NavLink to="/" style={({ isActive }) => ({
						color: isActive ? '#A93226' : 'white' })}>
						Home
					</NavLink>
				</div>
				<div style={{ margin: '10px' }}>
					<NavLink to="/about" style={({ isActive }) => ({
						color: isActive ? '#A93226' : 'white' })}>
						About
					</NavLink>
				</div>
				<div style={{ margin: '10px' }}>
					<NavLink to="/contact" style={({ isActive }) => ({
						color: isActive ? '#A93226' : 'white' })}>
						Contact
					</NavLink>
				</div>
				<div style={{ margin: '10px' }}>
					<NavLink to="/clients" style={({ isActive }) => ({
						color: isActive ? '#A93226' : 'white' })}>
						Sing up!
					</NavLink>
				</div>
				<div style={{ margin: '10px' }}>
					<NavLink to="/signIn" style={({ isActive }) => ({
						color: isActive ? '#A93226' : 'white' })}>
						Sing in
					</NavLink>
				</div>
			</div>
		</>
	)
};

export default Header;
