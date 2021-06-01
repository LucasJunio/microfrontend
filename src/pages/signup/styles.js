import styled from 'styled-components'

import Background from '../../assets/images/bg2.jpg'

export const Classlogotipo = styled.div`
position: absolute;
margin:30px;
margin-left:10%;
z-index:2
`

export const Loading = styled.div`
margin: 0px;
padding: 0px;
position: fixed;
display: '';
right: 0px;
top: 0px;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.4);
z-index: 9999;
`

export const Spinner = styled.div`
border: 4px solid rgba(0, 0, 0, 0.1);
border-left-color:#2f0aff;
border-radius: 50%;
width: 20px;
height: 20px;
z-index: 999;
position: absolute;
left: 50%;
top: 40%;
animation: spin 1s linear infinite;

@keyframes spin{
    to { transform: rotate(360deg); }
  }

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