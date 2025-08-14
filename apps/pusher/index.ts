import { prisma } from "db/client";
import { xAddBulk } from "redisstream/client";

async function main() {
    //console.log('sending requests');

    try {
        const websites = await prisma.website.findMany({
            select : {
                url: true,
                id: true
            }
        })

        await xAddBulk(websites);
    } catch (err) {
        //console.log("problem with fetching websites", err);
    }

}

setInterval(() => {
    main()
}, 1000 * 20)


main();

