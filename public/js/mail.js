import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        created() {
            console.log('vue instance is created');
        },
        
        methods: {
            processMailFailure(result) {
                result = JSON.parse(result.message).message;
                let error = document.querySelector('.sendForm_error');
                error.classList.add('error');

                result.forEach(element);
                this.$refs["errorEmpty"].innerHTML = result.message;
                this.$refs["errorEmpty"].style.display = 'block';
                this.$refs["successBox"].style.display = 'none';

                if(result.blanks) {
                    result.blanks.forEach(element => {
                        this.$refs[element].classList.add("error");
                    });
                }
            },

            // processMailSuccess(result) {
            //     this.$refs["successBox"].innerHTML = result.message;
            //     this.$refs["successBox"].style.display = 'block';
            //     this.$refs["errorEmpty"].style.display = 'none';

            //     this.$refs["submit"].disabled = true;
            //     document.querySelector(".submitBtn").value = "Thank You!";
            // },

            processMailSuccess(result) {
                this.$refs["successBox"].innerHTML = result.message;
                this.$refs["successBox"].style.display = 'block';
                this.$refs["errorEmpty"].style.display = 'none';
            
                // Disable the submit button after a successful submission
                this.$refs["submit"].disabled = true;
                document.querySelector(".submitBtn").value = "Thank You!";
            },            

            processMail(event) {
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();