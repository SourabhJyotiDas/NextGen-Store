export async function GET(req) {

   try {
      return Response.json(
         {
            success: true,
            message: "Api working fine"
         },
         { status: 200 }
      );
   } catch (error) {
      return Response.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
