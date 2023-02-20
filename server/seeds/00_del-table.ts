import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const tables = ["restaurant_likes" , "reviews" , "food_images" , "restaurants" , "users" ];
    const trx = await knex.transaction();
    try {
        for(const table of tables){
            await trx(table).del();
        }
        await trx.commit();
    } catch (error) {
        await trx.rollback();
    }
};
