export const WORKERS_BY_SLUG = {
  "home-cleaning": [
    { id: "w1", name: "Priya Sharma", rating: 4.8, experience: "4 yrs experience", jobs: 620, photo: "https://picsum.photos/seed/worker-priya/160/160" },
    { id: "w2", name: "Sunita Devi", rating: 4.9, experience: "6 yrs experience", jobs: 940, photo: "https://picsum.photos/seed/worker-sunita/160/160" },
    { id: "w3", name: "Kavita Rao", rating: 4.7, experience: "3 yrs experience", jobs: 410, photo: "https://picsum.photos/seed/worker-kavita/160/160" },
  ],
  "salon-for-women": [
    { id: "w1", name: "Anjali Mehta", rating: 4.9, experience: "5 yrs experience", jobs: 780, photo: "https://picsum.photos/seed/worker-anjali/160/160" },
    { id: "w2", name: "Ritu Kapoor", rating: 4.8, experience: "4 yrs experience", jobs: 615, photo: "https://picsum.photos/seed/worker-ritu/160/160" },
    { id: "w3", name: "Neha Joshi", rating: 4.7, experience: "3 yrs experience", jobs: 390, photo: "https://picsum.photos/seed/worker-neha/160/160" },
  ],
  "ac-repair": [
    { id: "w1", name: "Ramesh Kumar", rating: 4.9, experience: "7 yrs experience", jobs: 1120, photo: "https://picsum.photos/seed/worker-ramesh/160/160" },
    { id: "w2", name: "Suresh Yadav", rating: 4.6, experience: "3 yrs experience", jobs: 340, photo: "https://picsum.photos/seed/worker-suresh/160/160" },
    { id: "w3", name: "Vikram Singh", rating: 4.8, experience: "5 yrs experience", jobs: 700, photo: "https://picsum.photos/seed/worker-vikram/160/160" },
  ],
  plumbing: [
    { id: "w1", name: "Manoj Tiwari", rating: 4.7, experience: "6 yrs experience", jobs: 890, photo: "https://picsum.photos/seed/worker-manoj/160/160" },
    { id: "w2", name: "Ashok Verma", rating: 4.8, experience: "4 yrs experience", jobs: 560, photo: "https://picsum.photos/seed/worker-ashok/160/160" },
  ],
  electrician: [
    { id: "w1", name: "Rajesh Gupta", rating: 4.8, experience: "5 yrs experience", jobs: 730, photo: "https://picsum.photos/seed/worker-rajesh/160/160" },
    { id: "w2", name: "Deepak Nair", rating: 4.9, experience: "8 yrs experience", jobs: 1240, photo: "https://picsum.photos/seed/worker-deepak/160/160" },
    { id: "w3", name: "Santosh Pillai", rating: 4.6, experience: "3 yrs experience", jobs: 300, photo: "https://picsum.photos/seed/worker-santosh/160/160" },
  ],
  painting: [
    { id: "w1", name: "Mahesh Chauhan", rating: 4.8, experience: "6 yrs experience", jobs: 410, photo: "https://picsum.photos/seed/worker-mahesh/160/160" },
    { id: "w2", name: "Prakash Reddy", rating: 4.7, experience: "5 yrs experience", jobs: 360, photo: "https://picsum.photos/seed/worker-prakash/160/160" },
  ],
  "water-purifier": [
    { id: "w1", name: "Amit Sinha", rating: 4.8, experience: "4 yrs experience", jobs: 520, photo: "https://picsum.photos/seed/worker-amit/160/160" },
    { id: "w2", name: "Vinod Kumar", rating: 4.7, experience: "3 yrs experience", jobs: 280, photo: "https://picsum.photos/seed/worker-vinod/160/160" },
  ],
  "wall-panels": [
    { id: "w1", name: "Rahul Verma", rating: 4.8, experience: "5 yrs experience", jobs: 340, photo: "https://picsum.photos/seed/worker-rahul/160/160" },
    { id: "w2", name: "Sanjay Patil", rating: 4.6, experience: "3 yrs experience", jobs: 210, photo: "https://picsum.photos/seed/worker-sanjay/160/160" },
  ],
};

export const getWorkersFor = (slug) => WORKERS_BY_SLUG[slug] || [];
