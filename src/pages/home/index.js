import React from 'react'
import {Classlogotipo} from './styles'

const home =() => {
   
    return (
     <>      
      <Classlogotipo><img src="images/logo-vileve-pay-cor-140px.png" alt="logotipo"></img></Classlogotipo> 
      
      
      <section class="ftco-section">
      <div class="container">
      <div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Gateway de Pagamentos Vileve</h2>
				</div>
			</div>

			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center">Realize seu cadastro</h3>
      
            <form action="#" class="signin-form" onsubmit="criptpassword()">
            <div class="form-group">
		      	<input type="text" id="nome" name="nome" class="form-control" placeholder="Nome Completo" required oninvalid="this.setCustomValidity('O campo Nome Completo é obrigatório!')" oninput="setCustomValidity('')" />
						<input type="text" id="celular" name="celular" class="form-control" placeholder="Celular" required />
						<input type="email" class="form-control" placeholder="E-mail" required oninvalid="this.setCustomValidity('O campo E-mail também é obrigatório!')" oninput="setCustomValidity('')" />
		        </div>

            <div class="form-group">
	              <input id="senha" name="senha" type="password" class="form-control" placeholder="Password" required oninvalid="this.setCustomValidity('Insira uma senha!')" oninput="setCustomValidity('')" />
	              <span toggle="#senha" class="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
              
              <div class="form-group d-md-flex">
              <div class="w-100">

              <label class="checkbox-wrap checkbox-secondary">Aceito os termos Vileve
									  <input type="checkbox" checked />
									  <span class="checkmark"></span>
									</label>

              </div>
              </div>

          <div class="form-group">
					<button type="submit" class="form-control btn btn-primary submit px-3">Crie sua conta</button>
				  </div>

            </form>
      
      
      </div></div></div>


      </div>
      </section>
     </>
    );
  }
  
  export default home;
  