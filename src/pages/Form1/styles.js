import styled from 'styled-components'
import Background from '../../assets/images/White-Abstract.jpg'
import imagelef1 from '../../assets/images/register.png'
import imagelef2 from '../../assets/images/register.png'

export const Classlogotipo = styled.div`
position: absolute;
margin:30px;
margin-left:7%;
z-index:2
`
export const Containerform = styled.div`
display:flex;
padding:20px;
width:100%;
height:100%;
`
export const Containerleft = styled.div`
display: flex;
width:50%;
height:100%;
`

export const Containerright = styled.div`
width:50%;
height:100%;
padding-left:40px
`
export const Imageleft1 = styled.img.attrs({
src:`${imagelef1}`
})`
align-self:center;
width:90%;
`

export const Imageleft2 = styled.img.attrs({
src:`${imagelef2}`
})`
align-self:center;
width:90%;
`

export const ClassBackground = styled.div`
background-image:url(${Background});
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

export const ContainerCard = styled.div`
display:flex;  
direction:row;
justify-content:space-around;
width:100%;
height:600px;
`

export const TitleWelcome = styled.div`
color:#125984;
font-size:15px;
font-weight:400;
margin-left:20px
/* text-shadow: 0 0 3px #ccc; */
`

export const PositionButton = styled.div`
position: absolute;
right: 0; 
bottom: 0;
margin:20px;
float:right;
`
export const MarginField = styled.div`
margin-right:20px;
float:left;
`

