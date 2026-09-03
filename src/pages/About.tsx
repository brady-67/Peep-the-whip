import { Star, MapPin, Phone, Clock, Globe, Navigation, Mail, Award, Users, Heart, Wrench } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/18029637/pexels-photo-18029637.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Dealership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bmw-900/70 via-bmw-800/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bmw-50 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 animate-fade-up">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white/90 text-sm font-medium">4.4 · 4,418 Google reviews</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Peep The Whip Cars
            </h1>
            <p className="text-xl text-white/80 font-light mb-8 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Used car dealer in Nairobi. Your preferred choice for a BMW dealer in Kenya and East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-3xl p-8 md:p-10 animate-fade-up">
            <span className="text-bmw-500 font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gradient mt-2 mb-5">
              From Enthusiasts, For Enthusiasts
            </h2>
            <p className="text-ink/70 leading-relaxed mb-4">
              Here at PTW, we strive to be your preferred choice for a BMW dealer in Kenya and East Africa in general. We're a group of automotive (more particularly BMW) enthusiasts who share a passion for cars and motorsports.
            </p>
            <p className="text-ink/70 leading-relaxed">
              Our goal is to provide our customers with a complete service offering — from buying, selling, repairs, and customization of all BMW car brands, from Classics to New Age.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, value: '4.4★', label: 'Google Rating', sub: '4,418 reviews' },
              { icon: Users, value: '100+', label: 'Happy Customers', sub: 'Across East Africa' },
              { icon: Heart, value: '15+', label: 'Years of Passion', sub: 'BMW enthusiasts' },
              { icon: Wrench, value: 'Full', label: 'Service Offering', sub: 'Buy · Sell · Repair · Build' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bmw-400 to-bmw-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-bmw-500/20">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-extrabold text-2xl text-bmw-700">{stat.value}</div>
                <div className="text-sm font-semibold text-ink mt-1">{stat.label}</div>
                <div className="text-xs text-ink/50">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info card */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left: contact details */}
            <div className="p-8 md:p-12">
              <span className="text-bmw-500 font-semibold text-sm uppercase tracking-widest">Visit Us</span>
              <h2 className="font-display font-extrabold text-3xl text-gradient mt-2 mb-8">
                Come Say Hello
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-bmw-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-bmw-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-sm">Address</h4>
                    <p className="text-ink/60 text-sm">Bunyala Rd, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-bmw-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-bmw-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-sm">Phone</h4>
                    <a href="tel:0700206558" className="text-ink/60 text-sm hover:text-bmw-600 transition-colors">0700 206558</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-bmw-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-bmw-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-sm">Email</h4>
                    <p className="text-ink/60 text-sm">peepthewhipcars@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-bmw-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-bmw-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-sm">Hours</h4>
                    <p className="text-ink/60 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-ink/60 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <a href="tel:0700206558" className="btn-primary text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://maps.google.com/?q=Bunyala+Rd+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-sm flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Directions
                </a>
              </div>
            </div>

            {/* Right: map embed */}
            <div className="relative min-h-[400px] bg-bmw-100">
              <iframe
                title="Peep The Whip Location"
                src="https://www.google.com/maps?q=Bunyala+Road+Nairobi&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google review snippet */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1,2,3,4].map(i => <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
            <Star className="w-6 h-6 text-amber-400/40 fill-amber-400/40" />
          </div>
          <p className="font-display font-extrabold text-2xl text-gradient mb-2">4.4 out of 5</p>
          <p className="text-ink/60 text-sm">Based on 4,418 Google reviews</p>
          <p className="text-ink/40 text-xs mt-2 flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Used car dealer in Nairobi
          </p>
        </div>
      </section>
    </div>
  );
}
