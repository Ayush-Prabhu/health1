import React from 'react'
import Cardses from './Cardses'

export default function Home() {
    return (
        <address>
            <h1 >Welcome to the Health Literacy Portal!</h1>
            <p className='home_info'>
                Our mission is to empower researchers and healthcare professionals by providing a comprehensive platform for accessing, sharing, and contributing to knowledge in the field of health literacy.
                Through our portal, researchers can easily access resources, tools, and information necessary for conducting studies and advancing their understanding of health literacy-related topics. Whether you're investigating patient-provider communication, health education strategies, or the impact of literacy on health outcomes, our platform is designed to support your research endeavors.
            </p>
            <h4>Key features of the Health Literacy Portal include:</h4>
            <div className="App-header">
                <div className="card-container">
                    <Cardses
                        title="Manage Survey"
                        description="View Responses of your projects."
                        logo="📊"
                        />
                        {/* logo="📊" */}
                        {/* logo="0X1F4CA" // not working this also */}
                    <Cardses
                        title="Create New Project"
                        description="Create a project to store multiple surveys."
                        logo="📝"
                    />
                    <Cardses
                        title="Previous Projects"
                        description="View all your projects."
                        logo="📂"
                    />
                </div>
            </div>
            <ol type='number' className='details'>
                <li> <b> Research Form Activation: </b></li>
                <section>
                    Our unique system allows researchers to request activation links for specific research forms. Once approved by the admin, researchers can access and utilize these forms to gather data on their chosen topics.
                </section>

                <li> <b> Resource Library: </b></li>
                <section>
                    Explore our extensive collection of articles, studies, and reports covering various aspects of health literacy. Stay updated on the latest findings and trends in the field.
                </section>

                <li> <b> Community Collaboration: </b></li>
                <section>
                    Connect with fellow researchers, practitioners, and educators passionate about health literacy. Share insights, collaborate on projects, and exchange best practices to drive innovation in healthcare communication and education.
                </section>

                <li> <b> Training and Education: </b></li>
                <section>
                    Enhance your knowledge and skills through our training modules and educational resources. From online courses to webinars, we offer opportunities for professional development tailored to the needs of health literacy practitioners.
                </section>
                <li> <b> News and Updates:

                 </b></li>
                <section>
                    Stay informed about upcoming events, conferences, and initiatives in the realm of health literacy. Receive regular updates on new research findings, policy developments, and opportunities for engagement.
                </section>
                <p className='mb-3'>
                    Join us in our mission to promote health literacy and improve health outcomes for all. Together, we can bridge the gap between healthcare information and understanding, ensuring that everyone has the knowledge and skills to make informed decisions about their health.
                </p>
            </ol>
        </address>
    )
}
