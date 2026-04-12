'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'
import Image from 'next/image'

const About = () => {
  const team = [
    {
      name: 'Ehtisham',
      role: 'AI Agent Developer & Automation Expert',
      description: 'Specializes in custom AI agents, workflow automation, and voice interfaces.',
      image: '/images/ehtisham.png',
      email: 'ehtisham@dev2c.com',
      linkedin: 'https://linkedin.com/in/ehtisham',
      github: 'https://github.com/ehtisham'
    },
    {
      name: 'Tahir',
      role: 'Full-Stack Developer',
      description: 'Expert in modern web technologies, building scalable apps and automation systems.',
      image: '/images/tahir.png',
      email: 'tahir@dev2c.com',
      linkedin: 'https://linkedin.com/in/tahir',
      github: 'https://github.com/tahir'
    }
  ]

  return (
    <section id="about" className="py-32 lg:py-40 px-8 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dev2c-text">
            Meet Our <span className="text-dev2c-textmuted">Freelancers</span>
          </h2>
          <p className="text-xl text-dev2c-textmuted max-w-3xl mx-auto">
            A dedicated team combining expertise in AI agents, workflow automation, and scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card overflow-hidden group"
            >
              <div className="h-64 sm:h-80 w-full relative mb-6 rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-1 text-dev2c-text">
                {member.name}
              </h3>
              <p className="text-lg font-medium text-dev2c-textmuted mb-4">
                {member.role}
              </p>
              <p className="text-dev2c-textmuted mb-6">
                {member.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-lg transition-colors duration-200"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-lg transition-colors duration-200"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-lg transition-colors duration-200"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About 