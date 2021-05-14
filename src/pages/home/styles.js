import styled from 'styled-components'

import Background from '../../assets/images/bg2.jpg'

export const Classlogotipo = styled.div`
position: absolute;
margin:30px;
z-index:2
`

export const TitleWelcome = styled.div`
position: absolute;
text-align:center;
align-items:center;
color:#fff;
font-size:25px;
margin-top:5%;
text-shadow: 0 0 3px #ccc;
width:100%;
z-index:2
`



export const ContainerCard = styled.div`
left:33%;
position: absolute;
max-width:30%;
min-width:35%;
margin-top:10%;
z-index:10
`

export const DarkBackground = styled.div`
position:absolute;
width:100%;
height:100%;
opacity:0.7;
background-attachment: fixed;
 background-repeat: no-repeat;
 background-size: cover;
 -moz-background-size: cover;
 overflow-x: hidden;
 overflow-y: hidden;
`


export const ClassBackground = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url(${Background});
position:absolute;
width:100%;
height:100%;
background-attachment: fixed;
 background-repeat: no-repeat;
 background-size: cover;
 -moz-background-size: cover;
 overflow-x: hidden;
 overflow-y: hidden;
`
