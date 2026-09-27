export interface Certificate {
  title: string;
  issuer: string;
  issuedOn: string;
  image: string;
  credentialUrl?: string;
}

export const certificates: Certificate[] = [
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "AWS Academy",
    issuedOn: "27 Jun 2026",
    image: "/certificates/aws-cloud-foundations.jpg",
    credentialUrl: "https://www.credly.com/go/yq8Ia8WA",
  },
  {
    title: "AWS Academy Graduate - Cloud Developing",
    issuer: "AWS Academy",
    issuedOn: "27 Jun 2026",
    image: "/certificates/aws-cloud-developing.jpg",
    credentialUrl: "https://www.credly.com/go/dx5DUCJK",
  },
  {
    title: "AWS Academy Graduate - Cloud Architecting",
    issuer: "AWS Academy",
    issuedOn: "16 Jul 2026",
    image: "/certificates/aws-cloud-architecting.jpg",
    credentialUrl: "https://www.credly.com/go/9vkslfwx",
  },
  {
    title: "AWS Academy Graduate - Generative AI Foundations",
    issuer: "AWS Academy",
    issuedOn: "27 Jun 2026",
    image: "/certificates/aws-generative-ai-foundations.jpg",
    credentialUrl:
      "https://www.credly.com/badges/a7c39bdd-160f-4d7f-a0a3-06fa3118d7d1",
  },
  {
    title: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    issuedOn: "01 Oct 2024",
    image: "/certificates/cisco-computer-hardware-basics.jpg",
  },
  {
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    issuedOn: "01 Oct 2024",
    image: "/certificates/cisco-operating-systems-basics.jpg",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issuedOn: "27 Mar 2025",
    image: "/certificates/cisco-introduction-to-cybersecurity.jpg",
  },
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    issuedOn: "03 May 2025",
    image: "/certificates/cisco-ethical-hacker.jpg",
  },
  {
    title: "Network Defense",
    issuer: "Cisco Networking Academy",
    issuedOn: "05 May 2025",
    image: "/certificates/cisco-network-defense.jpg",
  },
];
