<?php

$fnlist = array("tut.html","trr.html", "ree.html");

$string = "";
$td = array(0);


$n = count($fnlist);
for ($i=0; $i < $n; $i++)
{
$fname = $fnlist[$i];
$fh = fopen ($fname, "r");
if (!$fh) die("cannot open file $fname");
while (!feof ($fh))
{
$buffer = fgets($fh, 4096);
echo $buffer;
$string .= $buffer;
}
fclose ($fh);

$string = strip_tags(stristr($string, "<html"));

$keywords = preg_split ("/[\s\"\#\'\\\[\]\(\),\.;_={}:\-+%><$!\?\/]+/", strtolower($string), -1, PREG_SPLIT_NO_EMPTY);

$freq = array_count_values($keywords);

while (list($key, $value) = each($freq))
{
if (!array_key_exists($key, $td)) $td[$key] = array_fill(0,$n,0);
$td[$key][$i] = $value;
}
}
ksort($td);

$c = 0;
print "<br>Ter-Doc matrix:<br>";
print "\n<table border='1px'>";
foreach ($td as $key => $value)
{
	print "<tr><td>$c</td><td>$key</td>";
	$c++;
	for ($i = 0; $i < $n; $i++)
		print "<td>$value[$i]</td>";
	print "</tr>";
}
print "</table>";
$dd = array(0);
for ($i=0; $i < $n; $i++)
{
$dd[$i] = array_fill(0,$n,0);
for ($j=0; $j < $n; $j++)
{
foreach ($td as $key => $value)
{
if ($value[$i] * $value[$j] > 0)
$dd[$i][$j]++;
}
}
}

$res1 = $dd[0][2] / ($dd[0][0]+$dd[2][2])*100;
print "Процент совпадений в 1 и 3 документах: {$res1} %";
print "<br>";
$res2 = $dd[0][1] / ($dd[0][0]+$dd[1][1])*100;
print "Процент совпадений в 1 и 2 документах: {$res2} %";
print "<br>";
$res3 = $dd[1][2] / ($dd[1][1]+$dd[2][2])*100;
print "Процент совпадений в 2 и 3 документах: {$res3} %";
print "<br>";


print "<br>Doc-Doc matrix:<br>";
print "<table border='1px'><tr><td></td>";
for ($i=0; $i < $n; $i++)
	print "<td>$i</td>";
print "</tr>";
for ($i=0; $i < $n; $i++)
{
	print "<tr><td>$i</td>";
	for ($j=0; $j < $n; $j++)
	{
		$el = $dd[$i][$j];
		print "<td>$el</td>";
	}
	print "</tr>";
}
print "</table>";

print "<br>Матрица DOC-DOC процентная: <br>";
print "<table border='1px'><tr><td></td>";
for ($i=0; $i < $n; $i++)
	print "<td>$i</td>";
print "</tr>";
for ($i=0; $i < $n; $i++)
{
	print "<tr><td>$i</td>";
	for ($j=0; $j < $n; $j++)
	{
		if ($i == $j)
		{
			print "<td>100%</td>";
		}
		else {
			$el = $dd[$i][$j] / ($dd[$i][$i] + $dd[$j][$j] - $dd[$i][$j]) * 100;
			print "<td>$el %</td>";
		}

	}
	print "</tr>";
}
print "</table>";




$keys = array_keys($td);
$m=60;
$tt = array(0);
for ($i=0; $i < $m; $i++)
{
$tt[$i] = array_fill(0,$m,0);
for ($j=0; $j < $m; $j++)
{
$t1 = $keys[$i]; $t2 = $keys[$j];
for ($k=0; $k < $n; $k++)
{
if ($td[$t1][$k] * $td[$t2][$k] > 0)
$tt[$i][$j]++;
}
}
}

print "<br>Term-Term matrix:<br>";
print "<table border='1px'><tr><td> </td>";
for ($j=0; $j < $m; $j++) print "<td>$j</td>";
print "</tr>";
for ($i=0; $i < $m; $i++)
{
print "<tr>";
print "<td>$i: </td>";
for ($j=0; $j < $m; $j++) print "<td> ".$tt[$i][$j]." </td>";
print "</tr>";

}
print "</table>";

?>
