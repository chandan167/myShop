import bcrypt from 'bcrypt'
const saltRound = 10;

export async function hash(text:string) {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(text, salt);
}

export async function compare(planText:string, hashText:string){
    return bcrypt.compare(planText, hashText)
}
