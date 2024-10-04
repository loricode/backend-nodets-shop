
   
export const getProducts = async (offset:number = 0, limit:number = 20) => {

   const responseData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
   let data = await responseData.json();
   
   const mapData = data.results.map((item:any) => {
      const id = item.url.split("/")[6];
      return {  
      name: item.name,
      id,
      price: (Math.random() * (100000 - 10000) + 10000).toFixed(2),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
     }
    });

   data.results = mapData;

   return data;

}

export const getProduct = async (id:number) => {
   const responseData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
   let data = await responseData.json();

   const result = { 
      height: data.height,
      baseExperience: data.base_experience,
      types: data.types,
      weight:data.weight
    } 

   return result;
}
