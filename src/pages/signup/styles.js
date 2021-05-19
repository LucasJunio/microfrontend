import styled from 'styled-components'

import Background from '../../assets/images/bg2.jpg'

export const Classlogotipo = styled.div`
position: absolute;
margin:30px;
margin-left:10%;
z-index:2
`

export const TitleWelcome = styled.div`
position: absolute;
text-align:center;
align-items:center;
color:#fff;
font-size:25px;
margin-top:120px;
text-shadow: 0 0 3px #ccc;
width:100%;
z-index:2
`

export const ContainerCard = styled.div`
position: absolute;
display:flex;
direction:row;
justify-content:space-around;
width:100%;
margin-top:145px;
z-index:10
`

export const ContainerCardSize = styled.div`
align-items:center;
max-width:85%;
`



export const ClassBackground = styled.div`
background-image:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)),url(${Background});
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
export const PositionFooter = styled.div`
position:absolute;
width:100%;
bottom:0;
`
export const PositionButton = styled.div`
float:right
`
export const DescriptionText = styled.div`
position:relative;
font-size:11px;
color:#9C27B0;
margin-top:-10px
`