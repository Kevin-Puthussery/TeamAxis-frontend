import React from 'react'

function Footer() {
  return (
    <>
      <div className="bg-[#0b132b] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* About Us */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase">About Us</h2>
            <p className="text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime
              dicta ipsum nemo itaque necessitatibus quas nobis, illum
              voluptate, pariatur recusandae alias harum!
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase">Newsletter</h2>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest trends
            </p>
            <div className="flex justify-center md:justify-start">
              <input
                type="email"
                placeholder="Email ID"
                className="px-4 py-2 rounded-l-md focus:outline bg-white text-white w-2/3"
              />
              <button className="bg-yellow-500 px-4 py-2 rounded-r-md">
                →
              </button>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase">Follow Us</h2>
            <p className="text-gray-300 mb-4">Let us be social</p>
            <div className="flex justify-center md:justify-start space-x-4 text-xl">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          Copyright © 2025 All rights reserved | This website is made with 💛 by 
          <span className="text-yellow-500 font-semibold"> Kevin Puthussery</span>
        </div>
      </div>

    </>
  )
}

export default Footer
