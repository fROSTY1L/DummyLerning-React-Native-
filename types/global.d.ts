export type onboardingSwiperDataType = {
    id: number,
    title: string,
    description: string,
    sortDescription: string,
    sortDescription2 ?: string,
    image: any
}

type Avatar = {
    public_id: string;
    url: string;
  };
  
  type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: Avatar;
    password?: string;
    courses: any;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type BannerDataTypes = {
    bannerImageUrl: any;
  };

declare global {
  var cart: any[];
  var purchasedCourses: any[];
  var updateCartCount: (count: number) => void;
}

export {};
