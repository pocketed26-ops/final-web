import React from 'react';
import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0 shrink-0 z-50" />
            
            <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-[#014AAC]">Privacy Policy</h1>
                    <div className="text-gray-600 space-y-1">
                        <p className="font-medium text-lg">Aura EduAid Private Limited</p>
                        <p className="text-sm">(operating the PocketEd brand)</p>
                        <p className="text-sm mt-4"><strong>Effective Date:</strong> 02/02/2026</p>
                        <p className="text-sm"><strong>Last Updated:</strong> 26/05/2026</p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">1. Introduction</h2>
                        <p className="mb-3">
                            Aura EduAid Private Limited ("Aura EduAid", "Company", "we", "us", or "our"), a company incorporated under the Companies Act, 2013, with its registered office at [REGISTERED OFFICE ADDRESS], Mumbai, Maharashtra, India (CIN: U85499MH2025PTC445706), operates the consumer-facing brand and programme "PocketEd". Any reference to "PocketEd" in this Policy or on our Website refers to the products, services, curriculum, and brand assets owned and operated by Aura EduAid Private Limited.
                        </p>
                        <p className="mb-3">
                            We are committed to protecting the privacy of every individual who interacts with our website, applications, and services.
                        </p>
                        <p className="mb-3">
                            This Privacy Policy explains how we collect, use, store, share, and protect personal information of school administrators, teachers, parents, students, and other website visitors. It is issued in accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act"), the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws.
                        </p>
                        <p>
                            By accessing or using our website (pocketed.in and any associated subdomains, hereinafter the "Website") or our services, you confirm that you have read, understood, and agree to the practices described in this Policy. If you do not agree, please do not use our Website or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">2. Scope of this Policy</h2>
                        <p className="mb-3">This Policy applies to all information collected through:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li>Our Website, including all pages, contact forms, and inquiry forms;</li>
                            <li>Our learning management system (LMS) and any student-facing applications hosted on the same domain or subdomains;</li>
                            <li>Communications you send to us via email, telephone, or other channels;</li>
                            <li>Engagements during teacher development sessions, workshops, and curriculum delivery at partner schools.</li>
                        </ul>
                        <p>
                            This Policy does not apply to third-party websites or services that may link to or from our Website. We encourage you to review the privacy policies of any such third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">3. Information We Collect</h2>
                        <p className="mb-4">
                            We collect only the information necessary to provide our services, communicate with schools, and improve the PocketEd programme. The categories of information we collect include:
                        </p>

                        <h3 className="text-xl font-medium mb-2 text-[#014AAC]">3.1 Information You Provide Directly</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>School and Principal Contact Information:</strong> Name of school, name and designation of the point of contact (principal, coordinator, trustee), school address, city, telephone number, email address, board affiliation (CBSE, ICSE, State Board, etc.), grade levels offered, and approximate student strength.</li>
                            <li><strong>Inquiry Details:</strong> Any message, question, or specific requirement you share through our contact form or via email.</li>
                            <li><strong>Teacher Information (where applicable):</strong> Name, subject taught, email, and phone number, collected when teachers register for free Teacher Development Sessions.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 text-[#014AAC]">3.2 Information Collected Automatically</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, device type, operating system, time zone, and approximate geographic location (city-level).</li>
                            <li><strong>Usage Data:</strong> Pages visited, time spent on each page, links clicked, and referring URLs. This is collected through cookies and similar technologies.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 text-[#014AAC]">3.3 Information Relating to Students (Future Scope)</h3>
                        <p className="mb-3">
                            When our student application and LMS go live, we may, with the explicit consent of the school and the verifiable consent of a parent or lawful guardian, collect limited information about students such as:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li>First name and class/section;</li>
                            <li>Login credentials issued by the school;</li>
                            <li>Lesson progress, activity completion, and assessment responses;</li>
                            <li>Anonymised engagement analytics for curriculum improvement.</li>
                        </ul>
                        <p>
                            We do not knowingly collect sensitive personal data of students such as biometric information, financial information, or contact details beyond what is strictly necessary for the educational service. Where any data of a child (under 18 years) is processed, we will obtain verifiable parental or guardian consent in accordance with Section 9 of the DPDP Act, 2023.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">4. How We Use Your Information</h2>
                        <p className="mb-3">We use the information collected for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li>To respond to inquiries from schools, trustees, and educators;</li>
                            <li>To schedule and deliver Teacher Development Sessions and curriculum programmes;</li>
                            <li>To issue invoices, manage contracts, and process payments for our services;</li>
                            <li>To send programme-related updates, certifications, and educational resources to participating schools;</li>
                            <li>To improve our curriculum, content, and learning outcomes based on aggregated, anonymised performance data;</li>
                            <li>To comply with applicable laws, accreditation requirements (such as NCFE MSSP, NSE Academy), and lawful requests from regulatory or government authorities;</li>
                            <li>To detect, prevent, and address technical issues, security incidents, or fraudulent activities.</li>
                        </ul>
                        <p>
                            We do not use personal information for automated profiling, advertising, or any purpose unrelated to the delivery of our educational services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">5. Legal Basis for Processing</h2>
                        <p className="mb-3">Under the DPDP Act, 2023, we process personal data only on one or more of the following lawful grounds:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Consent:</strong> You have provided clear, informed, and specific consent for the processing of your data.</li>
                            <li><strong>Legitimate Use:</strong> Processing is necessary for the performance of a contract (such as our service agreement with your school) or to respond to your inquiry.</li>
                            <li><strong>Legal Obligation:</strong> Processing is required to comply with applicable Indian law, taxation requirements, or regulatory directives.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">6. Sharing and Disclosure of Information</h2>
                        <p className="mb-3">Aura EduAid does not sell, rent, or trade personal information. We share information only in the following limited circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>With Partner Schools:</strong> Aggregated learning reports and certification data may be shared with the school that has engaged Aura EduAid for the PocketEd programme.</li>
                            <li><strong>With Service Providers:</strong> Trusted third-party vendors (such as cloud hosting providers, payment gateways, email delivery services, and analytics tools) who process data on our behalf under written agreements that require confidentiality and data protection standards consistent with this Policy.</li>
                            <li><strong>For Legal Reasons:</strong> Where required by law, court order, or a lawful request by a public authority, or to protect the rights, property, or safety of Aura EduAid, our users, or others.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, restructuring, or sale of assets, personal data may be transferred to the successor entity, subject to the same protections set out in this Policy.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">7. Cookies and Similar Technologies</h2>
                        <p className="mb-3">
                            Our Website uses cookies and similar tracking technologies to enhance user experience and analyse Website performance. Cookies are small text files stored on your device. The types of cookies we use include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li><strong>Essential Cookies:</strong> Required for the Website to function correctly.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website (for example, via Google Analytics or similar tools).</li>
                            <li><strong>Preference Cookies:</strong> Remember settings such as language or region.</li>
                        </ul>
                        <p>
                            You may disable cookies through your browser settings; however, some Website features may not function properly if you do so.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">8. Data Retention</h2>
                        <p className="mb-3">We retain personal data only for as long as is necessary to fulfil the purposes outlined in this Policy, including:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li><strong>Inquiry-related data:</strong> retained for up to twenty-four (24) months from the date of last contact, unless an ongoing engagement is established;</li>
                            <li><strong>School contract data:</strong> retained for the duration of the contract and for seven (7) years thereafter for legal, accounting, and audit purposes, as required under Indian law;</li>
                            <li><strong>Student learning data:</strong> retained for the academic year and one (1) subsequent year, after which it is anonymised or securely deleted;</li>
                            <li><strong>Website analytics data:</strong> retained in anonymised form for up to twenty-six (26) months.</li>
                        </ul>
                        <p>
                            Upon expiry of the retention period or upon a valid request for deletion, we will securely erase or anonymise the data, unless retention is required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">9. Data Security</h2>
                        <p className="mb-3">
                            Aura EduAid implements reasonable security practices and procedures as required under the IT Act, 2000 and the DPDP Act, 2023. These include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li>Encryption of data in transit using industry-standard protocols (TLS/SSL);</li>
                            <li>Access controls restricting personal data to authorised personnel only;</li>
                            <li>Regular review of our security practices and vendor agreements;</li>
                            <li>Secure cloud infrastructure with reputable service providers;</li>
                            <li>Confidentiality obligations binding all employees, contractors, and partners.</li>
                        </ul>
                        <p>
                            While we take all reasonable steps to protect your information, no method of transmission over the Internet or electronic storage is one hundred percent secure. You acknowledge this inherent risk when sharing information with us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">10. Your Rights as a Data Principal</h2>
                        <p className="mb-3">Under the DPDP Act, 2023, you have the following rights with respect to your personal data:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-3">
                            <li><strong>Right to Access:</strong> Obtain confirmation of whether we process your data and request a summary of such data.</li>
                            <li><strong>Right to Correction and Erasure:</strong> Request correction of inaccurate or outdated data, or erasure of data no longer required.</li>
                            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent previously given, at any time, by writing to our Grievance Officer.</li>
                            <li><strong>Right to Grievance Redressal:</strong> File a complaint regarding our data practices.</li>
                            <li><strong>Right to Nominate:</strong> Nominate another individual to exercise these rights in the event of death or incapacity.</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact our Grievance Officer using the details in Section 13. We will respond to all valid requests within the timelines prescribed by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">11. Children's Privacy</h2>
                        <p className="mb-3">
                            The PocketEd programme is designed for delivery within schools to students in Grades 6 to 8. We do not collect personal data directly from children through our Website. When our student application becomes operational, all data processing involving children will be carried out only after obtaining verifiable consent from a parent or lawful guardian, and through the partner school as the data fiduciary co-ordinator.
                        </p>
                        <p>
                            We do not undertake tracking, behavioural monitoring, or targeted advertising directed at children. All student data is used solely for educational and assessment purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">12. Cross-Border Data Transfers</h2>
                        <p>
                            Personal data collected by Aura EduAid is primarily stored on servers located in India. In limited cases, where our service providers are located outside India (for example, cloud-based email or analytics services), data may be transferred outside India. Such transfers will be made only to jurisdictions permitted under the DPDP Act, 2023 and subject to contractual safeguards equivalent to those provided in this Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">13. Grievance Officer and Contact Information</h2>
                        <p className="mb-3">
                            In compliance with the Information Technology Act, 2000, the Consumer Protection (E-Commerce) Rules, 2020, and the DPDP Act, 2023, we have appointed a Grievance Officer to address any concerns regarding this Policy or the handling of your personal data.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-3">
                            <p className="mb-1"><strong>Grievance Officer:</strong> Siddharth Gadhia</p>
                            <p className="mb-1"><strong>Email:</strong> siddharthgadhia@pocketed.in</p>
                            <p className="mb-1"><strong>Postal Address:</strong> Aura EduAid Private Limited, A/404, Veena Sargam, Mahavir Nagar, Kandivali West, Mumbai, Maharashtra, India</p>
                            <p className="mt-4 text-sm text-gray-500"><strong>Response Time:</strong> We aim to acknowledge all grievances within forty-eight (48) hours and resolve them within thirty (30) days of receipt, as required by law.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">14. Changes to this Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in law, technology, or our practices. Any updates will be posted on this page with a revised "Last Updated" date. Where the changes are material, we will provide additional notice (for example, via email to schools we are currently engaged with). Your continued use of our Website or services after such updates constitutes acceptance of the revised Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[#014AAC]">15. Governing Law and Jurisdiction</h2>
                        <p className="mb-6">
                            This Privacy Policy is governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.
                        </p>
                        <div className="bg-[#014AAC]/5 p-6 rounded-xl border border-[#014AAC]/10">
                            <p className="text-[#014AAC] font-medium text-center">
                                By using our Website or services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
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
