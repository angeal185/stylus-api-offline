var sha3=function(){var state,State,L,permute,zeros,RC,r,keccak_f,hex,o;return(L=function(lo,hi){this.lo=lo||0,this.hi=hi||0}).clone=function(a){return new L(a.lo,a.hi)},L.prototype={xor:function(that){return this.lo^=that.lo,this.hi^=that.hi,this},not:function(){return new L(~this.lo,~this.hi)},and:function(that){return this.lo&=that.lo,this.hi&=that.hi,this},circ:function(n){var tmp,m;return 32<=n&&(tmp=this.lo,this.lo=this.hi,this.hi=tmp,n-=32),0===n||(m=32-n,tmp=(this.hi<<n)+(this.lo>>>m),this.lo=(this.lo<<n)+(this.hi>>>m),this.hi=tmp),this},toString:(hex=function(n){return("00"+n.toString(16)).slice(-2)},o=function(n){return hex(255&n)+hex(n>>>8)+hex(n>>>16)+hex(n>>>24)},function(){return o(this.lo)+o(this.hi)})},zeros=function(k){var i,z=[];for(i=0;i<k;i+=1)z[i]=new L;return z},State=function(s){var fn=function(x,y){return fn.array[x%5+y%5*5]};return fn.array=s||zeros(25),fn.clone=function(){return new State(fn.array.map(L.clone))},fn},permute=[0,10,20,5,15,16,1,11,21,6,7,17,2,12,22,23,8,18,3,13,14,24,9,19,4],RC="0,1;0,8082;z,808A;z,yy;0,808B;0,y0001;z,y8081;z,8009;0,8A;0,88;0,y8009;0,y000A;0,y808B;z,8B;z,8089;z,8003;z,8002;z,80;0,800A;z,y000A;z,y8081;z,8080;0,y0001;z,y8008".replace(/z/g,"80000000").replace(/y/g,"8000").split(";").map(function(str){var k=str.split(",");return new L(parseInt(k[1],16),parseInt(k[0],16))}),r=[0,1,62,28,27,36,44,6,55,20,3,10,43,25,39,41,45,15,21,8,18,2,61,56,14],keccak_f=function(){var x,y,i,b,C,D,round,last;for(round=0;round<24;round+=1){for(C=zeros(5),x=0;x<5;x+=1)for(y=0;y<5;y+=1)C[x].xor(state(x,y));for(D=(D=C.map(L.clone)).concat(D.splice(0,1)),x=0;x<5;x+=1)D[x].circ(1).xor(C[(x+4)%5]);for(x=0;x<5;x+=1)for(y=0;y<5;y+=1)state(x,y).xor(D[x]);for(x=0;x<5;x+=1)for(y=0;y<5;y+=1)state(x,y).circ(r[5*y+x]);for(last=state.array.slice(0),i=0;i<25;i+=1)state.array[permute[i]]=last[i];for(b=state.clone(),x=0;x<5;x+=1)for(y=0;y<5;y+=1)state(x,y).xor(b(x+1,y).not().and(b(x+2,y)));state(0,0).xor(RC[round])}},function(m){if(state=new State,m.length%68==67)m+="老";else{for(m+="";m.length%68!=67;)m+="\0";m+="耀"}var b,k;for(b=0;b<m.length;b+=68){for(k=0;k<68;k+=4)state.array[k/4].xor(new L(m.charCodeAt(b+k)+65536*m.charCodeAt(b+k+1),m.charCodeAt(b+k+2)+65536*m.charCodeAt(b+k+3)));keccak_f()}return state.array.slice(0,4).join("")}}();