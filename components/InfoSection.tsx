"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '@/components/typewriter-effect';
import Link from 'next/link';

export default function InfoSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const titleWords = [
    { text: "About" },
    { text: "Us" },
    { text: "&" },
    { text: "Our" },
    { text: "Programs" },
  ];

  return (
    <div className="container mx-auto px-4 font-['Sarpanch']">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-wider">
          <TypewriterEffectSmooth words={titleWords} />
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
      </div>

      {/* Sections */}
      {[
        {
          title: "Bennett University",
          image: "/bennett-campus.jpg",
          direction: "normal",
          content: [
            "Bennett University is a premier educational institution established by the Times Group, India’s largest media conglomerate. Founded with a vision to provide Ivy League quality education, the university is located in Greater Noida, near Delhi NCR.",
            "The university offers undergraduate, postgraduate, and doctoral programs across various disciplines including Engineering, Management, Law, Media, and Liberal Arts. Bennett University is committed to providing a transformative educational experience that prepares students for leadership roles in a rapidly evolving global landscape.",
            "With state-of-the-art infrastructure, industry partnerships, and a focus on research and innovation, Bennett University stands at the forefront of academic excellence in India."
          ]
        },
        {
          title: "About IRCO",
          image: "/irco-office.jpg",
          direction: "reverse",
          content: [
            "The International Relations and Collaborations Office (IRCO) at Bennett University serves as the gateway to global opportunities for students and faculty. IRCO facilitates international partnerships, exchange programs, and collaborative research initiatives with prestigious institutions worldwide.",
            "Through strategic alliances with universities across the globe, IRCO enables students to gain international exposure, cultural understanding, and a global perspective that is essential in today’s interconnected world.",
            "IRCO’s mission is to foster a globally engaged campus community and to position Bennett University as a hub for international academic collaboration and innovation."
          ]
        },
        {
          title: "International Affairs Society",
          image: "/ias-team.jpg",
          direction: "normal",
          content: [
            "The International Affairs Society (IAS) is a student-led organization at Bennett University that serves as a platform for students interested in global politics, diplomacy, and international relations.",
            "IAS members engage in discussions on current global issues, policy analysis, and diplomatic simulations that enhance their critical thinking, public speaking, and leadership skills.",
            "Through its activities, IAS aims to create a community of globally aware individuals who can contribute meaningfully to international discourse and policy-making in their future careers."
          ]
        }
      ].map((section, index) => (
        <motion.section
          key={index}
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className={`flex flex-col md:flex-row${section.direction === "reverse" ? "-reverse" : ""} items-center gap-8`}>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
              {section.content.map((para, i) => (
                <p key={i} className="text-gray-300 mb-4">{para}</p>
              ))}
            </div>
            <div className="md:w-1/2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image src={section.image} alt={section.title} fill className="object-cover" />
            </div>
          </div>
        </motion.section>
      ))}

      {/* Testimonial Section */}
      <motion.section
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 md:p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 relative">
              <Image src="/abhay-bhansal.jpg" alt="Abhay Bhansal" fill className="object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Abhay Bhansal</h3>
            <p className="text-gray-400 mb-4">Director, International Relations</p>
            <p className="text-gray-300 italic text-lg mb-6">
              “At Bennett University, we believe in providing our students with a truly global education. Through our international partnerships and exchange programs, we are creating future leaders who understand the complexities of our interconnected world and are equipped to address global challenges with innovative solutions.”
            </p>
            <div className="flex space-x-1 text-yellow-400 text-xl">{"★★★★★"}</div>
          </div>
        </div>
      </motion.section>

      {/* Glimpses Gallery */}
      <motion.section
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Glimpses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="relative h-48 md:h-64 rounded-lg overflow-hidden group">
              <Image
                src={`/glimpse-${num}.jpg`}
                alt={`Glimpse ${num}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm">IAS Event {num}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Programs For You</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Global Leadership Program",
              image: "/program-1.jpg",
              link: "/programs/global-leadership",
              description: "A comprehensive program designed to develop leadership skills in an international context."
            },
            {
              title: "Diplomatic Studies",
              image: "/program-2.jpg",
              link: "/programs/diplomatic-studies",
              description: "An intensive course on diplomatic protocols, international negotiations, and conflict resolution."
            },
            {
              title: "International Policy Workshop",
              image: "/program-3.jpg",
              link: "/programs/policy-workshop",
              description: "A hands-on workshop on policy formulation, analysis, and implementation in global contexts."
            }
          ].map((program, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="relative h-48">
                <Image src={program.image} alt={program.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                <p className="text-gray-400 mb-4">{program.description}</p>
                <Link href={program.link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/programs" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors">
            View All Programs
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
