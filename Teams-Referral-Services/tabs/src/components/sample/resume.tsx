import React from "react";
import { AffindaCredential, AffindaAPI } from "@affinda/affinda";
import fs from "fs";
import { resourceLimits } from "worker_threads";
import { Person } from "@microsoft/mgt-react";


// export function ResumeParse(inputFile : File | undefined) {
    
    export function ResumeParse(inputFile : File) {
    const credential = new AffindaCredential("60b0af12c11c7861fb8279a4c2012863e008d6e8")
    const client = new AffindaAPI(credential)

        // const readStream = fs.createReadStream("");
        
    //     return client.createResume({file: inputFile}).then((result) => {
    //         console.log("Returned data:");
    //         console.dir(result)
    //         return result;
    //     })
    // }

    return client.createResume({ url: "https://api.affinda.com/static/sample_resumes/example.pdf" }).then((result) => {
        console.log("Returned data:");
        console.dir(result);
        return result;
    })
}