import Link from "next/link";

const Footer = () => {
   return (
     <footer className="bg-gray-900 text-white py-8">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
           {/* About */}
           <div>
             <h3 className="font-semibold text-lg mb-3">About</h3>
             <ul className="space-y-2 text-sm text-gray-300">
               <li><a href="#">Company</a></li>
               <li><a href="#">Careers</a></li>
               <li><a href="#">Press</a></li>
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h3 className="font-semibold text-lg mb-3">Contact</h3>
             <ul className="space-y-2 text-sm text-gray-300">
               <li><a href="#">Help Center</a></li>
               <li><a href="#">Support</a></li>
               <li><a href="#">Feedback</a></li>
             </ul>
           </div>
 
           {/* Social Media */}
           <div>
             <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
             <ul className="space-y-2 text-sm text-gray-300">
               <li><a href="#">Facebook</a></li>
               <li><a href="#">Twitter</a></li>
               <li><a href="#">Instagram</a></li>
             </ul>
           </div>
 
           {/* Change Language */}
           <div>
             <h3 className="font-semibold text-lg mb-3">Settings</h3>
             <Link href="/user/chnage-language" className="text-blue-400 hover:underline">
               Change Language
             </Link>
           </div>
         </div>
 
         <hr className="border-gray-700 my-6" />
 
         <div className="text-center text-gray-400 text-sm">
           © {new Date().getFullYear()} Your E-Commerce. All rights reserved.
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;
 