// random recipe from TheMealDB (external API)
export async function GET() {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      if (!res.ok) throw new Error("Failed to fetch from TheMealDB");
      const { meals } = await res.json();
      const m = meals[0];
  
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = m[`strIngredient${i}`]?.trim();
        const measure = m[`strMeasure${i}`]?.trim();
        if (ing) ingredients.push(`${measure} ${ing}`.trim());
      }
  
      return new Response(
        JSON.stringify({
          id: m.idMeal,
          title: m.strMeal,
          category: m.strCategory,
          area: m.strArea,
          instructions: m.strInstructions.split("\r\n").filter(Boolean),
          image_url: m.strMealThumb,
          tags: m.strTags ? m.strTags.split(",") : [],
          ingredients,
          source: m.strSource,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "External fetch error" }), { status: 502 });
    }
  }