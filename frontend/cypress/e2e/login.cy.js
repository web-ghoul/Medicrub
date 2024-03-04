/* eslint-disable no-undef */
describe('Login Page', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  
  describe("Testing UI",()=>{
    it('Check Login Title', () => {
      cy.getByDataTest("login-title").contains(/Sign in/i)
    })
  
    it('Check Logo', () => {
      cy.getByDataTest("logo").each(($logo)=>{
        cy.wrap($logo).within(()=>{
          cy.get("h6").contains(/medicrub/i)
        })
      })
    })

    it("Check Forgot Password Modal",()=>{
      cy.getByDataTest("forgot-password-button").click()
      cy.getByDataTest("forogt-password-modal").contains(/Forgot Password ?/i)
    })
  })

  describe("Testing Form Logic",()=>{
    beforeEach(()=>{
      cy.contains(/username is required/i).should("not.exist")
      cy.contains(/password is required/i).should("not.exist")
      cy.contains(/Password must be at least 8 characters/i).should("not.exist")
    })

    afterEach(()=>{
      cy.wait(3000)
    })

    it("Submit without enter anything",()=>{
      cy.loginTyping({dataTest:"username",value:""},{dataTest:"password",value:""},"login-button")
      cy.contains(/username is required/i).should("exist")
      cy.contains(/password is required/i).should("exist")
    })

    it("Submit with enter Username only",()=>{
      cy.loginTyping({dataTest:"username",value:"webGhoul"},{dataTest:"password",value:""},"login-button")
      cy.contains(/username is required/i).should("not.exist")
      cy.contains(/password is required/i).should("exist")
    })

    it("Submit with enter Username and Password less than 8 characters",()=>{
      cy.loginTyping({dataTest:"username",value:"webGhoul"},{dataTest:"password",value:"123"},"login-button")
      cy.contains(/username is required/i).should("not.exist")
      cy.contains(/password is required/i).should("not.exist")
      cy.contains(/Password must be at least 8 characters/i).should("exist")
    })

    it("Submit with Username and Password are incorrect",()=>{
      cy.intercept('POST', 'https://frail-elk-pea-coat.cyclic.app/api/Admin/Login').as('submitLogin');
      cy.loginTyping({dataTest:"username",value:"webGhoul"},{dataTest:"password",value:"12345678"},"login-button")
      cy.wait('@submitLogin').then((intercept)=>{
        const status = intercept.response.statusCode
        cy.wrap(status).should("equal",400)
        const body = intercept.response.body
        expect(body).to.not.have.property("token")
      });
      cy.contains(/username is required/i).should("not.exist")
      cy.contains(/password is required/i).should("not.exist")
      cy.contains(/You are trying to get data which is not exist/i).should("exist")
    })

    it("Submit with Username and Password are Correct",()=>{
      cy.intercept('POST', 'https://frail-elk-pea-coat.cyclic.app/api/Admin/Login').as('submitLogin');
      cy.loginTyping({dataTest:"username",value:"medicurb"},{dataTest:"password",value:"Gwejk_F@G#kbshb0921"},"login-button")
      cy.contains(/username is required/i).should("not.exist")
      cy.contains(/password is required/i).should("not.exist")
      //Wait and Check on Response
      cy.wait('@submitLogin').then((intercept)=>{
        const status = intercept.response.statusCode
        cy.wrap(status).should("eq",201)
        const body = intercept.response.body
        expect(body).to.have.property("token")
      });
      cy.contains(/You are trying to get data which is not exist/i).should("not.exist")
      cy.location("pathname").should("eq","/dashboard")
      cy.contains(/login successfully/i).should("exist")
      
    })
  })
})