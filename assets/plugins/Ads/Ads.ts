export interface Ad {
    imageUrl: string,
    title: string,
    body: string,
    url: string
}

const ALL_ADS: Ad[] = [
    {
      imageUrl:
        "./remote_work.jpg",
      title: 'Curso Profesional de JavaScript',
      body:
        'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
      url: '#',
    },
  
    {
        imageUrl:
        "./remote_work.jpg",
        title: 'Curso Profesional de JavaScript',
        body:
          'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
        url: '#',
      },
    
        {
            imageUrl:
            "./remote_work.jpg",
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          },
        
          {
            imageUrl:
            "./remote_work.jpg",
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          },
        
          {
            imageUrl:
              'https://unsplash.com/photos/mQmuv-3jAOc',
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          },
       
          {
            imageUrl:
            "./remote_work.jpg",
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          },
        
          {
            imageUrl:
            "remote_work.jpg",
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          },
        
          {
            imageUrl:
            "./remote_work.jpg",
            title: 'Curso Profesional de JavaScript',
            body:
              'Mejora tus habilidades en Javascript. Conoce Typescript para mejorar el control de tus variables.',
            url: '#',
          }
       ];


class Ads{
    private static instance: Ads;
    private ads:Ad[];

    private constructor(){
        this.initAds();
    };

    static getInstance(){
        if(!Ads.instance){
            Ads.instance = new Ads();
        }
        return Ads.instance;
    }

    private initAds(){
        this.ads = [... ALL_ADS];
    }

    getAd(){
        if(this.ads.length === 0)
            this.initAds();
       return this.ads.pop();
    }
}

export default Ads;