// -----------------------------------------------------------------------------
// Component: ContactInfo
// Description: Component used to display contact information.

// -----------------------------------------------------------------------------

import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8 text-gray-300">
      <div className="flex items-start gap-4">
        <MapPin className="text-gold w-6 h-6 mt-1" />
        <div>
          <p className="text-white font-semibold text-lg">Address</p>
          <p>123 Flavor Street, Downtown, Izmir, Turkey</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Phone className="text-gold w-6 h-6 mt-1" />
        <div>
          <p className="text-white font-semibold text-lg">Phone</p>
          <p>+90 (555) 123 45 67</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Mail className="text-gold w-6 h-6 mt-1" />
        <div>
          <p className="text-white font-semibold text-lg">Email</p>
          <p>hello@bitecraft.com</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Clock className="text-gold w-6 h-6 mt-1" />
        <div>
          <p className="text-white font-semibold text-lg">Working Hours</p>
          <p>Open 24 hours a day, 7 days a week</p>
        </div>
      </div>
    </div>
  );
}
