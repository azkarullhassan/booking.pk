import GoBackButton from '@/components/GoBackButton';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GoBackButton />
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">About Hotels.pak</h1>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Welcome to Hotels.pak, your trusted partner in finding the perfect accommodation 
              across Pakistan. We are committed to making your travel experience memorable and 
              comfortable.
            </p>
            
            <p>
              Founded with a vision to revolutionize the hospitality industry in Pakistan, 
              Hotels.pak connects travelers with the best hotels, guest houses, and resorts 
              throughout the country. From bustling metropolitan cities to serene mountain 
              retreats, we offer a diverse range of accommodations to suit every budget and preference.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              To provide travelers with easy access to quality accommodations while supporting 
              local hospitality businesses across Pakistan. We believe in creating memorable 
              experiences through exceptional service and authentic Pakistani hospitality.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Extensive network of verified hotels across Pakistan</li>
              <li>Best price guarantee with no hidden fees</li>
              <li>24/7 customer support</li>
              <li>Secure booking system</li>
              <li>Local expertise and insider knowledge</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              Our dedicated team of travel enthusiasts and hospitality experts work tirelessly 
              to ensure you have the best possible experience. With deep local knowledge and 
              a passion for service, we are here to help you discover the beauty of Pakistan.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                  alt="Ahmad Khan - CEO" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Ahmad Khan</h3>
                <p className="text-green-600 font-medium">CEO & Founder</p>
                <p className="text-sm text-gray-600 mt-2">
                  15+ years in hospitality industry with a vision to revolutionize hotel booking in Pakistan.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
                  alt="Sarah Ahmed - CTO" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Sarah Ahmed</h3>
                <p className="text-green-600 font-medium">Chief Technology Officer</p>
                <p className="text-sm text-gray-600 mt-2">
                  Tech expert ensuring our platform provides the best user experience and security.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" 
                  alt="Hassan Ali - Head of Operations" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Hassan Ali</h3>
                <p className="text-green-600 font-medium">Head of Operations</p>
                <p className="text-sm text-gray-600 mt-2">
                  Manages our hotel partnerships and ensures quality standards across all properties.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Customer First</h3>
                <p className="text-gray-700">
                  Every decision we make is centered around providing the best possible experience for our customers.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Local Expertise</h3>
                <p className="text-gray-700">
                  Our deep understanding of Pakistan's hospitality landscape helps us curate the best accommodations.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Innovation</h3>
                <p className="text-gray-700">
                  We continuously improve our platform with the latest technology to serve you better.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Trust & Transparency</h3>
                <p className="text-gray-700">
                  We believe in honest pricing, clear policies, and building long-term relationships with our users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}