import React from 'react'

function Contact() {
  return (
    <div className="page-x">
      <div className="auth-card my-6 sm:my-12">
        <div className="bg-surface-muted text-white px-4 sm:px-8 py-5 sm:py-6">
          <h2 className="text-xl font-semibold">Get In Touch With Us</h2>
        </div>

        <div className="flex flex-col md:flex-row p-5 sm:p-8 md:p-12 gap-8 md:gap-12">
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div>
              <h3 className="text-text-h font-medium mb-1">Phone Number</h3>
              <p className="text-text-secondary text-sm">0012334566</p>
            </div>
            <hr className="border-border" />

            <div>
              <h3 className="text-text-h font-medium mb-1">Email Address</h3>
              <p className="text-text-secondary text-sm">Johndoe@example.com</p>
            </div>
            <hr className="border-border" />

            <div>
              <h3 className="text-text-h font-medium mb-1">Location</h3>
              <p className="text-text-secondary text-sm">Lorem Ipsum</p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-xl sm:text-2xl text-text-heading font-normal mb-3">Send us a message</h2>
            <p className="text-text-secondary mb-8 text-sm leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in
              molestie feugiat.
            </p>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <input type="text" placeholder="Your Name" className="input-field input-field-sm md:w-1/2" />
                <input type="email" placeholder="Your E-mail" className="input-field input-field-sm md:w-1/2" />
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <input type="tel" placeholder="Phone Number" className="input-field input-field-sm md:w-1/2" />
                <input type="text" placeholder="Subject" className="input-field input-field-sm md:w-1/2" />
              </div>

              <textarea placeholder="Message" rows="5" className="textarea-field mt-1"></textarea>

              <button type="submit" className="btn-primary mt-2 px-8 py-3 rounded-full text-sm w-full sm:w-max">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
