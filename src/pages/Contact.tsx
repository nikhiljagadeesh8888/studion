import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-wedding.jpg";

const sessionTypes = ["Wedding", "Engagement", "Brand", "Other"];
const hearAboutOptions = ["Google", "Instagram", "TikTok", "Facebook", "Recommended from a friend", "Word of Mouth", "Supplier Referral", "Other"];

const Contact = () => {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    weddingDate: "",
    ceremonyTime: "",
    guestCount: "",
    venue: "",
    likeAbout: "",
    hearAbout: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New ${selectedSession || "Photography"} Enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nSession: ${selectedSession}\nMessage: ${formData.message}\nWedding Date: ${formData.weddingDate}\nCeremony Time: ${formData.ceremonyTime}\nGuest Count: ${formData.guestCount}\nVenue: ${formData.venue}\nLike About Photography: ${formData.likeAbout}\nHeard About: ${formData.hearAbout}`
    );
    window.location.href = `mailto:nikhiljagadeesh8888@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputClass = "w-full bg-transparent border border-border px-4 py-3 text-sm font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors";

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}

      {/* <button */}

      {/* <button

        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 nav-link text-xs flex items-center gap-2 hover:text-primary"
      >
        ← Back

      </button>

      </button> */}


      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img src={heroImg} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-white text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] font-light"
          >
            Contact Form
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mt-4"
          >
            Your Story Begins Here
          </motion.p>
        </div>
      </div>

      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center py-16 md:py-20 px-6"
      >
        <p className="font-serif text-foreground text-base md:text-lg font-light leading-relaxed mb-6">
          Please provide as much information about your wedding day as possible, the more information the better – I really love to understand your vision and how you want the day to feel. This way I can make sure my photography & editing style aligns perfectly.
        </p>
        <p className="font-serif text-muted-foreground text-sm md:text-base font-light leading-relaxed">
          I aim to respond to all enquiries within 48hrs.<br />
          if you are waiting to hear back from me please check your junk/spam folder.
        </p>
      </motion.div>

      {/* Form */}
      <div className="bg-secondary py-16 md:py-24 px-6">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-10"
        >
          {/* Name */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Your Full Name/s *</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="............... & ..............." className={inputClass} required />
            <p className="font-serif text-muted-foreground text-xs mt-2">For wedding enquiries please provide both full names.</p>
          </div>

          {/* Email */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Email address *</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} required />
          </div>

          {/* Phone */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Contact Number *</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} required />
          </div>

          {/* Location */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Your Location *</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Town" className={inputClass} required />
          </div>

          {/* Session type */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-4 block">What type of session are you looking for? *</label>
            <div className="space-y-3">
              {sessionTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <span className={`w-4 h-4 rounded-full border border-border flex items-center justify-center transition-colors ${selectedSession === type ? "border-foreground" : ""}`}>
                    {selectedSession === type && <span className="w-2 h-2 rounded-full bg-foreground" />}
                  </span>
                  <span className="font-serif text-foreground text-sm">{type}</span>
                  <input type="radio" name="session" value={type} checked={selectedSession === type} onChange={() => setSelectedSession(type)} className="sr-only" />
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Wedding Enquiry / Other Enquiry *</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about you and your vision for the day! Colours, Fashion, Aesthetic, Vibe & what's most important to you both!"
              className={`${inputClass} resize-none`}
              required
            />
            <p className="font-serif text-muted-foreground text-xs mt-2 leading-relaxed">
              Tell me about you and your vision for the day! Colours, Fashion, Aesthetic & Feeling you want to create. How did you meet, what you both love doing together & what's most important on your wedding day.
            </p>
          </div>

          {/* Wedding date */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Date of wedding?</label>
            <input name="weddingDate" value={formData.weddingDate} onChange={handleChange} className={inputClass} />
          </div>

          {/* Ceremony time */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Ceremony Time?</label>
            <input name="ceremonyTime" value={formData.ceremonyTime} onChange={handleChange} placeholder="1pm" className={inputClass} />
          </div>

          {/* Guest count */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Estimated Guest Count</label>
            <input name="guestCount" value={formData.guestCount} onChange={handleChange} className={inputClass} />
          </div>

          {/* Venue */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">Your Wedding Venue(s)?</label>
            <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Name and Location of all Venues" className={inputClass} />
          </div>

          {/* Like about photography */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">What do you like about my photography? *</label>
            <input name="likeAbout" value={formData.likeAbout} onChange={handleChange} className={inputClass} required />
          </div>

                   {/* How did you hear */}
          <div>
            <label className="font-serif text-muted-foreground text-sm mb-2 block">
              How did you hear about me? *
            </label>
            <textarea
              name="hearAbout"
              rows={4}
              value={formData.hearAbout}
              onChange={handleChange}
              placeholder="How did you find my services? If from a friend or supplier referral please let me know who so I can send them a little thank you"
              className={`${inputClass} resize-none`}
              required
            />
            {/* <div className="mt-3 space-y-1">
              {hearAboutOptions.map((opt) => (
                <p key={opt} className="font-serif text-foreground text-sm">
                  {opt}
                </p>
              ))}
            </div> */}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button type="submit" className="btn-outline-editorial px-16">
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
