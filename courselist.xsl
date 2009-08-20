<?xml version="1.0" encoding="windows-1252" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <xsl:for-each select="root/course">
  <li class="coursename" onmouseover="showContent(this)">
   	<div class="drawer-handle">
		<table class="courseHeader">
			<tr>
				<td valign="middle" style="width:30px;"></td>
				<td style="width:240px;">
				<span>
					<xsl:value-of select="dcode"/><xsl:text> </xsl:text>
    					<xsl:value-of select="cnumber"/><xsl:text> </xsl:text>
    					<xsl:value-of select="cname"/><xsl:text> </xsl:text>
    					
				</span>
				</td>
				<td valign="middle" style="width:30px;"><a href="#" onclick="deleteContent(this)"><img src='images/TrashIcon2.png' onclick='deleteContent(this)'/></a></td>
			</tr>
		</table>
	</div>
    <div class="drawer-content">
    <ol id="course" class="toplist">
   	<form>
    <xsl:for-each select="sections/section">
	
      <li>
	<input type='radio' class='radio' onclick='UpdateScheduler()' >
	<xsl:attribute name="name">
		<xsl:value-of select="//root/course/dcode"/><xsl:text></xsl:text><xsl:value-of select="//root/course/cnumber"/><xsl:text> </xsl:text>
	</xsl:attribute>	
	</input>
	<span><xsl:value-of select="specialnumber" /><xsl:text></xsl:text></span>
	<span>&#160;<xsl:value-of select="credits" /><xsl:text></xsl:text>&#160;Credits<br/></span>
	<xsl:for-each select="class"><span>
      	<xsl:text> </xsl:text>
	
        <xsl:value-of select="classtype"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="sectionnum"/>
        <xsl:text> </xsl:text>
      	<xsl:if test="monday=1">M,</xsl:if>
        <xsl:if test="tuesday=1">T,</xsl:if>
        <xsl:if test="wednesday=1">W,</xsl:if>
        <xsl:if test="thursday=1">Th,</xsl:if>
        <xsl:if test="friday=1">F,</xsl:if>
        <xsl:if test="saturday=1">S,</xsl:if>
        <xsl:value-of select="starttime"/>-<xsl:value-of select="endtime"/></span><br />
        </xsl:for-each>
      </li>
    </xsl:for-each>
    </form>
    </ol>
    </div>
    </li>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
 
