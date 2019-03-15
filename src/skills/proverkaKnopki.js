export default function testButton(e){
    if(e.key === '1'||e.path[1].id === 'b1'){
        return 'AttackByFireball';
    }
    if(e.key === '2'||e.path[1].id === 'b2'){
        return 'Healing';
    }
    if(e.key === '3'||e.path[1].id === 'b3'){
        return 'AttackBySoundWave';
    }
    if(e.key === '4'||e.path[1].id === 'b4'){
        return 'Lighting';
    }
}