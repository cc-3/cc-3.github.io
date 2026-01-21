function rm(btn, id) {
  var mypre = document.getElementById(id);
  mypre.innerHTML = '';
  document.getElementById(btn).style.visibility = 'hidden';
}

function display(data, id, btn) {
  var mypre = document.getElementById(id);
  mypre.innerHTML = data.join('\n');
  document.getElementById(btn).style.visibility = 'visible';
}

function quicksort() {
  var mypre = document.getElementById('quicksort-out');
  mypre.innerHTML = '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">6</span><span class="p">,</span> <span class="mi">8</span><span class="p">,</span> <span class="mi">10</span><span class="p">]</span></pre></div>';
  document.getElementById('bquicksort').style.visibility = 'visible';
}

function nums() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="o">&lt;</span><span class="k">class</span> <span class="err">&#39;</span><span class="nc">int</span><span class="s1">&#39;&gt;</span>',
      '<span class="mi">3</span>',
      '<span class="mi">4</span>',
      '<span class="mi">2</span>',
      '<span class="mi">6</span>',
      '<span class="mf">1.5</span>',
      '<span class="mi">1</span>',
      '<span class="mi">27</span>',
      '<span class="mi">4</span>',
      '<span class="mi">8</span>',
      '<span class="o">&lt;</span><span class="k">class</span> <span class="err">&#39;</span><span class="nc">float</span><span class="s1">&#39;&gt;</span>',
      '<span class="mf">2.5</span>',
      '<span class="mf">3.5</span>',
      '<span class="mf">5.0</span>',
      '<span class="mf">1.25</span>',
      '<span class="mf">6.25</span>',
      '</pre></div>'
    ],
    'nums-out',
    'bnums'
  );
}

function bools() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="o">&lt;</span><span class="k">class</span> <span class="err">&#39;</span><span class="nc">bool</span><span class="s1">&#39;&gt;</span>',
      '<span class="bp">False</span>',
      '<span class="bp">True</span>',
      '<span class="bp">False</span>',
      '<span class="bp">True</span>',
      '</pre></div>'
    ],
    'bools-out',
    'bbools'
  );
}

function strings1() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">hello</span>',
      '<span class="mi">5</span>',
      '<span class="n">hello</span> <span class="n">world</span>',
      '<span class="n">hello</span> <span class="n">world</span> <span class="mi">12</span>',
      '</pre></div>'
    ],
    'strings1-out',
    'bstrings1'
  );
}

function strings2() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">Hello</span>',
      '<span class="n">HELLO</span>',
      '  <span class="n">hello</span>',
      ' <span class="n">hello</span>',
      '<span class="n">he</span><span class="p">(</span><span class="n">ell</span><span class="p">)(</span><span class="n">ell</span><span class="p">)</span><span class="n">o</span>',
      '<span class="n">world</span>',
      '</pre></div>'
    ],
    'strings2-out',
    'bstrings2'
  );
}

function lists() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">]</span>',
      '<span class="mi">1</span>',
      '<span class="mi">2</span>',
      '<span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">]</span>',
      '<span class="n">bar</span> <span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">]</span>',
      '<span class="mi">3</span>',
      '</pre></div>'
    ],
    'lists-out',
    'blists'
  );
}

function lists1() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">8</span><span class="p">,</span> <span class="mi">9</span><span class="p">,</span> <span class="mi">4</span><span class="p">]</span>',
      '</pre></div>'
    ],
    'lists1-out',
    'blists1'
  );
}

function lists2() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">cat</span>',
      '<span class="n">dog</span>',
      '<span class="n">monkey</span>',
      '</pre></div>'
    ],
    'lists2-out',
    'blists2'
  );
}

function lists3() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="c1">#1: cat</span>',
      '<span class="c1">#2: dog</span>',
      '<span class="c1">#3: monkey</span>',
      '</pre></div>'
    ],
    'lists3-out',
    'blists3'
  );
}

function lists4() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">9</span><span class="p">,</span> <span class="mi">16</span><span class="p">]</span></pre></div>'
    ],
    'lists4-out',
    'blists4'
  );
}

function lists5() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">9</span><span class="p">,</span> <span class="mi">16</span><span class="p">]</span></pre></div>'
    ],
    'lists5-out',
    'blists5'
  );
}

function lists6() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">16</span><span class="p">]</span></pre></div>'
    ],
    'lists6-out',
    'blists6'
  );
}

function dicts() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">cute</span>',
      '<span class="bp">True</span>',
      '<span class="n">wet</span>',
      '<span class="n">N</span><span class="o">/</span><span class="n">A</span>',
      '<span class="n">wet</span>',
      '<span class="n">N</span><span class="o">/</span><span class="n">A</span>',
      '</pre></div>'
    ],
    'dicts-out',
    'bdicts'
  );
}

function dicts1() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">A</span> <span class="n">person</span> <span class="n">has</span> <span class="mi">2</span> <span class="n">legs</span>',
      '<span class="n">A</span> <span class="n">cat</span> <span class="n">has</span> <span class="mi">4</span> <span class="n">legs</span>',
      '<span class="n">A</span> <span class="n">spider</span> <span class="n">has</span> <span class="mi">8</span> <span class="n">legs</span>',
      '</pre></div>'
    ],
    'dicts1-out',
    'bdicts1'
  );
}

function dicts2() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">A</span> <span class="n">person</span> <span class="n">has</span> <span class="mi">2</span> <span class="n">legs</span>',
      '<span class="n">A</span> <span class="n">cat</span> <span class="n">has</span> <span class="mi">4</span> <span class="n">legs</span>',
      '<span class="n">A</span> <span class="n">spider</span> <span class="n">has</span> <span class="mi">8</span> <span class="n">legs</span>',
      '</pre></div>'
    ],
    'dicts2-out',
    'bdicts2'
  );
}

function dicts3() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">{</span><span class="mi">0</span><span class="p">:</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">2</span><span class="p">:</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">4</span><span class="p">:</span> <span class="mi">16</span><span class="p">}</span></pre></div>'
    ],
    'dicts3-out',
    'bdicts3'
  );
}

function sets() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="bp">True</span>',
      '<span class="bp">False</span>',
      '<span class="bp">True</span>',
      '<span class="mi">3</span>',
      '<span class="mi">3</span>',
      '<span class="mi">2</span>',
      '</pre></div>'
    ],
    'sets-out',
    'bsets'
  );
}

function sets1() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="c1">#1: cat</span>',
      '<span class="c1">#2: fish</span>',
      '<span class="c1">#3: dog</span>',
      '</pre></div>'
    ],
    'sets1-out',
    'bsets1'
  );
}


function sets2() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="p">{</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">}</span></pre></div>'
    ],
    'sets2-out',
    'bsets2'
  );
}

function tuples() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="o">&lt;</span><span class="k">class</span> <span class="err">&#39;</span><span class="nc">tuple</span><span class="s1">&#39;&gt;</span>',
      '<span class="mi">5</span>',
      '<span class="mi">1</span>',
      '</pre></div>'
    ],
    'tuples-out',
    'btuples'
  );
}

function funct() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">negative</span>',
      '<span class="n">zero</span>',
      '<span class="n">positive</span>',
      '</pre></div>'
    ],
    'funct-out',
    'bfunct'
  );
}

function funct1() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">Hello</span><span class="p">,</span> <span class="n">Bob</span><span class="err">!</span>',
      '<span class="n">HELLO</span><span class="p">,</span> <span class="n">FRED</span>',
      '</pre></div>'
    ],
    'funct1-out',
    'bfunct1'
  );
}

function funct2() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="mi">4</span>',
      '<span class="mi">5</span>',
      '<span class="mi">16</span>',
      '<span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">9</span><span class="p">,</span> <span class="mi">16</span><span class="p">,</span> <span class="mi">25</span><span class="p">]</span>',
      '<span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">]</span>',
      '<span class="mi">15</span>',
      '</pre></div>'
    ],
    'funct2-out',
    'bfunct2'
  );
}

function cls() {
  display(
    [
      '<div class="codehilite"><pre><span></span><span class="n">Hello</span><span class="p">,</span> <span class="n">Fred</span>',
      '<span class="n">HELLO</span><span class="p">,</span> <span class="n">FRED</span><span class="err">!</span>',
      '</pre></div>'
    ],
    'cls-out',
    'bcls'
  )
}

function tokenizer() {
  var mypre = document.getElementById('tokenizer-out');
  mypre.innerHTML = '<div class="codehilite"><pre><span></span><span class="p">[</span><span class="s1">\'hello\'</span><span class="p">,</span> <span class="s1">\'world\'</span><span class="p"><span class="p">]</span></pre></div>';
  document.getElementById('btokenizer').style.visibility = 'visible';
}
