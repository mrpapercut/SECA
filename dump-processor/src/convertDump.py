filecounter = 0
linecounter = 0

def getWritableFile():
    filename = 'systemWithCoordinatesSplit{:02d}.log'.format(filecounter)
    fullpath = '../dumps/{}'.format(filename)
    fh = open(fullpath, 'a')
    return fh

def closeFile(fh):
    fh.close()

with open('../dumps/systemsWithCoordinates.json') as f:
    fh = getWritableFile()

    for line in f:
        line = line.strip()

        # Remove first & last line of file
        if len(line) == 1: continue

        # Remove trailing comma if exists
        if line[-1] == ',': line = line[:-1]

        fh.write(line + '\n')

        if linecounter >= 1000000:
            print('Written {} lines'.format((filecounter + 1) * 1000000))
            filecounter += 1
            linecounter = 0
            closeFile(fh)
            fh = getWritableFile()
        else:
            linecounter += 1

print('Written {} lines'.format(((filecounter + 1) * 1000000) + linecounter))
