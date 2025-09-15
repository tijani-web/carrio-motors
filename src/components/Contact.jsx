// Contact.jsx
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have questions or need assistance? Our team is ready to help you
            find your dream car.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon">
                <MapPin size={22} />
              </div>
              <h3>Visit Us</h3>
              <p>
                Plot 23, Aptech Avenue
                <br />
                Lagos, Nigeria
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Phone size={22} />
              </div>
              <h3>Call Us</h3>
              <p>
                +234 800 123 4567
                <br />
                +234 900 987 6543
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Mail size={22} />
              </div>
              <h3>Email Us</h3>
              <p>
                info@carriomotors.com
                <br />
                support@carriomotors.com
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Clock size={22} />
              </div>
              <h3>Working Hours</h3>
              <p>
                Mon - Fri: 9:00 AM - 6:00 PM
                <br />
                Sat: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <label className="form-label">Your Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <label className="form-label">Your Email</label>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
              />
              <label className="form-label">Subject</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="form-textarea"
              ></textarea>
              <label className="form-label">Your Message</label>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="inline-icon" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="status-message success">
                <CheckCircle size={18} />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="status-message error">
                <AlertCircle size={18} />
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
