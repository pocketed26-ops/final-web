import React from 'react';
import Navbar from "@/components/Navbar";

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0 shrink-0 z-50" />
            
            <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-[#014AAC]">Terms & Conditions</h1>
                    <div className="text-gray-600 space-y-1">
                        <p className="font-medium text-lg">Aura EduAid Private Limited</p>
                        <p className="text-sm">(operating the PocketEd brand)</p>
                        <p className="text-sm mt-4"><strong>Effective Date:</strong> 20/02/2026</p>
                        <p className="text-sm"><strong>Last Updated:</strong> 26/05/2026</p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">1. Introduction and Acceptance</h2>
                        <p className="mb-3">
                            These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Aura EduAid Private Limited, a private limited company incorporated under the Companies Act, 2013, with its registered office at [REGISTERED OFFICE ADDRESS], Mumbai, Maharashtra, India (CIN: [CIN NUMBER]) ("Aura EduAid", "Company", "we", "us", or "our"). Aura EduAid owns and operates the consumer-facing brand and programme "PocketEd".
                        </p>
                        <p className="mb-3">
                            These Terms govern your access to and use of the PocketEd website (pocketed.in and associated subdomains, the "Website"), our learning management system ("LMS"), student application, curriculum content, teacher resources, and any related services delivered under the PocketEd brand (collectively, the "Services").
                        </p>
                        <p className="mb-3">
                            By accessing the Website or availing of any Services, you confirm that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the Website or Services.
                        </p>
                        <p>
                            These Terms are an electronic record published in accordance with the Information Technology Act, 2000, the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021, and the Consumer Protection (E-Commerce) Rules, 2020. No physical or digital signature is required to render this electronic agreement binding.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">2. Definitions</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>"Aura EduAid"</strong> means Aura EduAid Private Limited, the company providing the Services and the legal entity behind the PocketEd brand.</li>
                            <li><strong>"PocketEd"</strong> means the consumer-facing brand, curriculum, and programme operated by Aura EduAid Private Limited.</li>
                            <li><strong>"School"</strong> means any educational institution that engages Aura EduAid to deliver the PocketEd programme to its students.</li>
                            <li><strong>"Programme"</strong> means the structured financial literacy curriculum delivered to students in Grades 6 to 8 under the PocketEd brand, including lesson plans, presentations, activities, games, assessments, and certifications.</li>
                            <li><strong>"Teacher Development Session"</strong> means a complimentary or paid training session conducted by Aura EduAid for teachers of partner schools.</li>
                            <li><strong>"User"</strong> means any visitor, principal, trustee, teacher, parent, student, or other individual who accesses the Website or uses the Services.</li>
                            <li><strong>"Content"</strong> means all curriculum materials, lesson plans, videos, images, illustrations, characters (including the chapter-specific guru characters of the PocketEd programme), games, assessments, certificates, brand assets, software, and all other intellectual property made available through the Website or Services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">3. Eligibility</h2>
                        <p className="mb-3">
                            To use the Website or engage with our Services, you must be at least eighteen (18) years of age and competent to enter into a binding contract under the Indian Contract Act, 1872. Schools, trustees, and principals warrant that they have the authority to bind their institution to these Terms.
                        </p>
                        <p>
                            Students who participate in the Programme do so through their school as the contracting party. Students do not enter into direct contractual arrangements with Aura EduAid, and access to student-facing tools is provided through the school's enrolment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">4. User Conduct and Acceptable Use</h2>
                        <p className="mb-3">When using the Website or Services, you agree that you will not:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Use the Services for any unlawful, fraudulent, or harmful purpose;</li>
                            <li>Copy, reproduce, modify, distribute, sell, or commercially exploit any Content without prior written permission;</li>
                            <li>Reverse-engineer, decompile, or attempt to extract the source code of any software or LMS component;</li>
                            <li>Upload, share, or transmit any content that is defamatory, obscene, hateful, infringing, or otherwise objectionable;</li>
                            <li>Attempt to gain unauthorised access to the Website, LMS, or any user account;</li>
                            <li>Use automated tools (such as bots, scrapers, or crawlers) to access or extract data from the Website;</li>
                            <li>Impersonate any person, entity, or school, or misrepresent your affiliation with any institution;</li>
                            <li>Interfere with the security, integrity, or proper functioning of the Services.</li>
                        </ul>
                        <p>
                            Aura EduAid reserves the right to suspend or terminate access for any User found to be in violation of these conduct requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">5. Intellectual Property Rights</h2>
                        <p className="mb-3">
                            All Content available through the Website and Services, including but not limited to curriculum, lesson plans, presentations, video content, games, illustrations, the PocketEd logo, the names "PocketEd", "Mr. & Mrs. PocketEd", chapter-specific guru characters (including but not limited to Vishwakarma Seth, Eklavya Bhaiya, Hanuman Rakshak, and Dhruv Tara), brand colours, typography, and any associated trademarks, is the exclusive property of Aura EduAid Private Limited or its licensors.
                        </p>
                        <p className="mb-3">
                            Subject to your compliance with these Terms and the executed school agreement, Aura EduAid grants the partner school a limited, non-exclusive, non-transferable, revocable licence to use the Content solely for in-school delivery of the PocketEd programme to enrolled students during the term of the agreement.
                        </p>
                        <p>
                            No other licence or right is granted, whether by implication, estoppel, or otherwise. Schools, teachers, students, and any third parties are expressly prohibited from reproducing, redistributing, sublicensing, modifying, or commercially exploiting any Content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">6. Confidentiality</h2>
                        <p>
                            Each party agrees to maintain the confidentiality of any non-public information disclosed by the other party in the course of the engagement, including but not limited to curriculum design, pricing, student data, school operations, and business strategy. This obligation survives the termination of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">7. Disclaimers and Limitations of Liability</h2>
                        <p className="mb-3">The Website and Services are provided on an "as is" and "as available" basis. To the maximum extent permitted under applicable law:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Aura EduAid does not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components;</li>
                            <li>Aura EduAid makes no guarantee of specific educational outcomes, learning gains, or career results for students;</li>
                            <li>Any content shared via the Website, including blog posts, financial concepts, or examples, is for educational purposes only and does not constitute financial, investment, legal, or tax advice;</li>
                            <li>Aura EduAid shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of revenue, data, or goodwill, arising out of or in connection with the use of the Services;</li>
                            <li>Aura EduAid's aggregate liability under these Terms shall not exceed the fees actually paid by the relevant school to Aura EduAid in the twelve (12) months preceding the event giving rise to the claim.</li>
                        </ul>
                        <p>
                            Nothing in this section limits any liability that cannot be excluded under applicable Indian law, including liability for fraud or wilful misconduct.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">8. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Aura EduAid, its directors, officers, employees, and agents from and against any claims, damages, liabilities, losses, costs, and expenses (including reasonable legal fees) arising out of or related to: (a) your breach of these Terms; (b) your misuse of the Content or Services; (c) your violation of any applicable law; or (d) your infringement of any third-party rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">9. Termination</h2>
                        <p className="mb-3">
                            Aura EduAid may suspend or terminate your access to the Website or Services at any time, with or without notice, if you are in breach of these Terms or if continued provision of the Services would expose Aura EduAid to legal or reputational risk.
                        </p>
                        <p className="mb-3">
                            School engagements may be terminated as per the specific terms of the executed agreement. In the event of termination by Aura EduAid without cause during a paid Programme term, a pro-rata refund of unutilised fees will be processed within forty-five (45) days. No refund shall be payable in the event of termination for cause attributable to the school.
                        </p>
                        <p>
                            Upon termination, your right to access the Services ceases immediately, and any outstanding payments become immediately due.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">10. Third-Party Links and Services</h2>
                        <p>
                            The Website may contain links to third-party websites, services, or resources (such as accreditation bodies, regulatory references, or educational partners). Aura EduAid does not endorse, control, or assume any responsibility for the content, accuracy, or practices of any third-party services. Your interactions with any such third party are solely between you and that third party.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">11. Modifications to the Terms</h2>
                        <p>
                            Aura EduAid reserves the right to modify these Terms at any time. Updates will be posted on this page with a revised "Last Updated" date. For material changes affecting active school engagements, we will provide notice to the school's designated point of contact. Your continued use of the Website or Services after such updates constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">12. Force Majeure</h2>
                        <p>
                            Neither party shall be liable for any failure or delay in performance under these Terms due to causes beyond reasonable control, including acts of God, natural disasters, pandemics, government action, war, civil unrest, labour disputes, internet outages, or failure of telecommunications networks. Affected obligations shall be suspended for the duration of the force majeure event.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">13. Grievance Redressal</h2>
                        <p className="mb-3">
                            In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and the Information Technology Act, 2000, any complaint regarding the Website, Services, or these Terms may be addressed to our Grievance Officer:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-3">
                            <p className="mb-1"><strong>Grievance Officer:</strong> Siddharth Gadhia</p>
                            <p className="mb-1"><strong>Email:</strong> siddharthgadhia@pocketed.in</p>
                            <p className="mb-1"><strong>Postal Address:</strong> Aura EduAid Private Limited, A/404, Veena Sargam, Mahavir Nagar, Kandivali West, Mumbai, Maharashtra, India</p>
                        </div>
                        <p>We shall acknowledge complaints within forty-eight (48) hours and resolve them within thirty (30) days of receipt.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">14. Governing Law and Dispute Resolution</h2>
                        <p className="mb-3">
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict-of-law principles.
                        </p>
                        <p className="mb-3">
                            Any dispute, controversy, or claim arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation between the parties. If unresolved within thirty (30) days, the dispute shall be referred to arbitration by a sole arbitrator appointed mutually by the parties, in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Mumbai. The proceedings shall be conducted in English or Hindi.
                        </p>
                        <p>
                            Subject to the arbitration clause above, the courts at Mumbai, Maharashtra shall have exclusive jurisdiction over any matter not subject to arbitration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">17. Miscellaneous</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy and any executed school agreement, constitute the entire understanding between the parties regarding the subject matter.</li>
                            <li><strong>Severability:</strong> If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.</li>
                            <li><strong>No Waiver:</strong> Failure by PocketEd to enforce any right or provision shall not constitute a waiver of such right or provision.</li>
                            <li><strong>Assignment:</strong> You may not assign or transfer your rights under these Terms without our prior written consent. Aura EduAid may assign these Terms in connection with a merger, acquisition, or sale of assets.</li>
                            <li><strong>Notices:</strong> All notices to Aura EduAid shall be sent to siddharthgadhia@pocketed.in or the registered office address.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">18. Contact</h2>
                        <p className="mb-3">For any questions regarding these Terms, please contact us at:</p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                            <p className="font-medium text-lg text-gray-800">Aura EduAid Private Limited</p>
                            <p className="text-sm text-gray-600 mb-3">(operating the PocketEd brand)</p>
                            <p className="mb-1"><strong>Address:</strong> A/404, Veena Sargam, Mahavir Nagar, Kandivali West, Mumbai, Maharashtra, India</p>
                            <p className="mb-1"><strong>Email:</strong> siddharthgadhia@pocketed.in</p>
                            <p className="mb-1"><strong>CIN:</strong> U85499MH2025PTC445706</p>
                        </div>
                        
                        <div className="bg-[#014AAC]/5 p-6 rounded-xl border border-[#014AAC]/10">
                            <p className="text-[#014AAC] font-medium text-center">
                                By accessing or using the Website or Services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                            </p>
                        </div>
                    </section>

                </div>
            </main>

            <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto bg-white">
                &copy; {new Date().getFullYear()} PocketEd. All rights reserved.
            </footer>
        </div>
    );
}
